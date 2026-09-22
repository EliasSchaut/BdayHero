import { and, asc, count, eq } from 'drizzle-orm';
import { db as defaultDb } from '$lib/server/db';
import type { Database } from '$lib/server/db/client';
import { guestShift, shift, shiftSlot, type Lang } from '$lib/server/db/schema';
import { ApiError } from '$lib/server/api/errors';
import { t } from '$lib/server/i18n';
import type { ShiftView, SlotGuest } from '$lib/types/shift';
import { ANONYMOUS_INITIALS } from '$lib/utils/anonymise';

/**
 * All shifts with their slots, localised to `lang` (falling back to English).
 * Assigned guests are anonymised unless their profile is public or they are the viewer.
 */
export async function listShifts(
	lang: Lang,
	viewerId: string | null = null,
	db: Database = defaultDb
): Promise<ShiftView[]> {
	const rows = await db.query.shift.findMany({
		orderBy: [asc(shift.sortOrder), asc(shift.id)],
		with: {
			infos: true,
			slots: {
				orderBy: [asc(shiftSlot.startAt)],
				with: {
					assignments: {
						with: {
							guest: {
								columns: {
									id: true,
									initials: true,
									firstName: true,
									lastName: true,
									email: true,
									image: true,
									profilePublic: true
								}
							}
						}
					}
				}
			}
		}
	});

	return rows.map((s) => {
		const info =
			s.infos.find((i) => i.lang === lang) ?? s.infos.find((i) => i.lang === 'en') ?? s.infos[0];
		return {
			id: s.id,
			name: info?.name ?? `#${s.id}`,
			description: info?.description ?? '',
			slots: s.slots.map((slot) => ({
				id: slot.id,
				startAt: slot.startAt.toISOString(),
				endAt: slot.endAt.toISOString(),
				capacity: slot.capacity,
				assigned: slot.assignments.length,
				guests: slot.assignments.map(({ guest }): SlotGuest => {
					const visible = guest.profilePublic || guest.id === viewerId;
					if (!visible)
						return { id: guest.id, initials: ANONYMOUS_INITIALS, name: null, image: null };
					return {
						id: guest.id,
						initials: guest.initials ?? '?',
						name:
							guest.firstName && guest.lastName
								? `${guest.firstName} ${guest.lastName}`
								: guest.email,
						image: guest.image
					};
				})
			}))
		};
	});
}

export async function mySlotIds(userId: string, db: Database = defaultDb): Promise<number[]> {
	const rows = await db
		.select({ id: guestShift.shiftSlotId })
		.from(guestShift)
		.where(eq(guestShift.guestId, userId));
	return rows.map((r) => r.id);
}

/**
 * Assign the user to a slot. Locks the slot row so concurrent sign-ups cannot
 * exceed the capacity. Idempotent for a user already assigned.
 */
export async function assignSlot(
	userId: string,
	slotId: number,
	db: Database = defaultDb
): Promise<void> {
	await db.transaction(async (tx) => {
		const [slot] = await tx
			.select({ id: shiftSlot.id, capacity: shiftSlot.capacity })
			.from(shiftSlot)
			.where(eq(shiftSlot.id, slotId))
			.for('update');
		if (!slot) throw new ApiError('WARNING', 404, t('api_shift_slot_not_found'));

		const [already] = await tx
			.select({ n: count() })
			.from(guestShift)
			.where(and(eq(guestShift.shiftSlotId, slotId), eq(guestShift.guestId, userId)));
		if (Number(already?.n ?? 0) > 0) return;

		const [taken] = await tx
			.select({ n: count() })
			.from(guestShift)
			.where(eq(guestShift.shiftSlotId, slotId));
		if (Number(taken?.n ?? 0) >= slot.capacity) {
			throw new ApiError('WARNING', 409, t('api_shift_slot_full'));
		}
		await tx
			.insert(guestShift)
			.values({ guestId: userId, shiftSlotId: slotId })
			.onConflictDoNothing();
	});
}

export async function unassignSlot(
	userId: string,
	slotId: number,
	db: Database = defaultDb
): Promise<void> {
	const deleted = await db
		.delete(guestShift)
		.where(and(eq(guestShift.guestId, userId), eq(guestShift.shiftSlotId, slotId)))
		.returning({ id: guestShift.shiftSlotId });
	if (deleted.length === 0) throw new ApiError('WARNING', 400, t('api_shift_guest_not_assigned'));
}

/** Remaining free places in a slot (used by tests and the API). */
export function freePlaces(capacity: number, assigned: number): number {
	return Math.max(0, capacity - assigned);
}
