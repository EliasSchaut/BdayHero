import { asc, count, eq } from 'drizzle-orm';
import { db as defaultDb } from '$lib/server/db';
import type { Database } from '$lib/server/db/client';
import { companion, guestShift, user, type User } from '$lib/server/db/schema';
import type { GuestUpdateInput } from '$lib/schemas/guest';
import type { GuestProfile, PublicGuest } from '$lib/types/guest';
import { anonymiseIfNotPublic } from '$lib/utils/anonymise';
import { generateInitials } from '$lib/utils/initials';
import { lookupGravatar } from '$lib/server/avatar/gravatar';

type UserWithCompanions = User & { companions: { name: string }[] };

function toPublicGuest(u: UserWithCompanions): PublicGuest {
	return {
		id: u.id,
		email: u.email,
		initials: u.initials ?? generateInitials(u),
		firstName: u.firstName,
		lastName: u.lastName,
		image: u.image,
		bio: u.bio,
		attendanceStatus: u.attendanceStatus,
		profilePublic: u.profilePublic,
		companions: u.companions.map((c) => ({ name: c.name }))
	};
}

/** Guest list for everyone: anonymised unless the guest made their profile public. */
export async function listPublicGuests(db: Database = defaultDb): Promise<PublicGuest[]> {
	const rows = await db.query.user.findMany({
		with: { companions: { columns: { name: true } } },
		orderBy: [asc(user.firstName), asc(user.lastName)]
	});
	return rows.map((r) => anonymiseIfNotPublic(toPublicGuest(r)));
}

/** Headcount: registered guests plus their companions. */
export async function countGuests(db: Database = defaultDb): Promise<number> {
	const [[guests], [companions]] = await Promise.all([
		db.select({ n: count() }).from(user),
		db.select({ n: count() }).from(companion)
	]);
	return Number(guests?.n ?? 0) + Number(companions?.n ?? 0);
}

export async function getProfile(
	userId: string,
	db: Database = defaultDb
): Promise<GuestProfile | null> {
	const row = await db.query.user.findFirst({
		where: eq(user.id, userId),
		with: {
			companions: { columns: { name: true } },
			guestShifts: { columns: { shiftSlotId: true } }
		}
	});
	if (!row) return null;
	return {
		...toPublicGuest(row),
		needBed: row.needBed,
		hasBed: row.hasBed,
		isVegan: row.isVegan,
		assignedSlotIds: row.guestShifts.map((g) => g.shiftSlotId)
	};
}

/**
 * Update the RSVP profile. Companions are replaced wholesale; initials are
 * regenerated and the avatar re-resolved from Gravatar when no OAuth image is set.
 */
export async function updateProfile(
	userId: string,
	input: GuestUpdateInput,
	db: Database = defaultDb
): Promise<GuestProfile> {
	const current = await db.query.user.findFirst({ where: eq(user.id, userId) });
	if (!current) throw new Error('user not found');

	const firstName = input.firstName ?? null;
	const lastName = input.lastName ?? null;
	const image = current.image ?? (await lookupGravatar(current.email));

	await db.transaction(async (tx) => {
		await tx
			.update(user)
			.set({
				firstName,
				lastName,
				bio: input.bio ?? null,
				attendanceStatus: input.attendanceStatus,
				profilePublic: input.profilePublic,
				needBed: input.needBed,
				hasBed: input.hasBed,
				isVegan: input.isVegan,
				initials: generateInitials({ firstName, lastName, email: current.email }),
				image,
				name:
					firstName && lastName
						? `${firstName} ${lastName}`
						: current.name || current.email.split('@')[0]
			})
			.where(eq(user.id, userId));
		await tx.delete(companion).where(eq(companion.guestId, userId));
		if (input.companions.length) {
			await tx
				.insert(companion)
				.values(input.companions.map((c) => ({ guestId: userId, name: c.name })));
		}
	});

	return (await getProfile(userId, db))!;
}

/** Remove the guest; sessions, accounts, companions and shift assignments cascade. */
export async function deleteProfile(userId: string, db: Database = defaultDb): Promise<void> {
	await db.delete(guestShift).where(eq(guestShift.guestId, userId));
	await db.delete(user).where(eq(user.id, userId));
}
