import { sql } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';
import { testDb } from './pglite';
import { shift, shiftInfo, shiftSlot, user, type User } from '../../src/lib/server/db/schema';

export async function resetDb() {
	await testDb.execute(
		sql`truncate table guest_shift, companion, shift_slot, shift_info, shift, session, account, verification, "user" cascade`
	);
}

let seq = 0;
export async function createGuest(
	overrides: Partial<typeof user.$inferInsert> = {}
): Promise<User> {
	const n = ++seq;
	const [row] = await testDb
		.insert(user)
		.values({ email: `guest${n}@example.com`, name: `guest${n}`, initials: 'G', ...overrides })
		.returning();
	return row;
}

export async function createShift(capacity = 1, slots = 1) {
	const [s] = await testDb.insert(shift).values({ sortOrder: seq }).returning();
	await testDb.insert(shiftInfo).values([
		{ shiftId: s.id, lang: 'en', name: 'Bar', description: 'Mix drinks' },
		{ shiftId: s.id, lang: 'de', name: 'Theke', description: 'Getränke mixen' }
	]);
	const start = new Date('2026-06-03T16:00:00Z');
	const rows = await testDb
		.insert(shiftSlot)
		.values(
			Array.from({ length: slots }, (_, i) => ({
				shiftId: s.id,
				startAt: new Date(start.getTime() + i * 3_600_000),
				endAt: new Date(start.getTime() + (i + 1) * 3_600_000),
				capacity
			}))
		)
		.returning();
	return { shift: s, slots: rows };
}

/** Minimal RequestEvent for calling +server.ts handlers directly. */
export function event(init: {
	user?: User | null;
	url?: string;
	method?: string;
	body?: unknown;
	params?: Record<string, string>;
	headers?: Record<string, string>;
}): RequestEvent {
	const url = new URL(init.url ?? 'http://localhost/api');
	const request = new Request(url, {
		method: init.method ?? 'GET',
		headers: { 'content-type': 'application/json', origin: url.origin, ...init.headers },
		body: init.body === undefined ? undefined : JSON.stringify(init.body)
	});
	return {
		url,
		request,
		params: init.params ?? {},
		locals: { user: init.user ?? null, session: null },
		cookies: { get: () => undefined, set: () => {}, delete: () => {} }
	} as unknown as RequestEvent;
}
