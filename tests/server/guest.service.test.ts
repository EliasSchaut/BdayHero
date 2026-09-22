import { beforeEach, describe, expect, it, vi } from 'vitest';
import { eq } from 'drizzle-orm';
import { testDb } from '../setup/pglite';
import { createGuest, resetDb } from '../setup/fixtures';
import { companion } from '../../src/lib/server/db/schema';
import {
	countGuests,
	deleteProfile,
	getProfile,
	listPublicGuests,
	updateProfile
} from '$lib/server/services/guest';

vi.mock('$lib/server/avatar/gravatar', () => ({ lookupGravatar: async () => null }));

beforeEach(resetDb);

describe('listPublicGuests / countGuests', () => {
	it('anonymises private guests and sorts by name', async () => {
		await createGuest({ firstName: 'Zoe', lastName: 'Zed', profilePublic: true });
		const priv = await createGuest({ firstName: 'Adam', lastName: 'Apple', profilePublic: false });
		await testDb.insert(companion).values({ guestId: priv.id, name: 'Hidden Friend' });

		const guests = await listPublicGuests();
		expect(guests.map((g) => g.firstName)).toEqual([null, 'Zoe']);
		expect(guests[0]).toMatchObject({ email: 'Anonym', initials: '?', companions: [] });
		expect(await countGuests()).toBe(3); // 2 guests + 1 companion
	});
});

describe('updateProfile', () => {
	it('replaces companions, regenerates initials and keeps the e-mail', async () => {
		const g = await createGuest({ email: 'alice@example.com' });
		await testDb.insert(companion).values({ guestId: g.id, name: 'Old Friend' });

		const profile = await updateProfile(g.id, {
			firstName: 'Alice',
			lastName: 'Wonder',
			bio: 'hi',
			attendanceStatus: 1,
			profilePublic: true,
			needBed: true,
			hasBed: false,
			isVegan: true,
			companions: [{ name: 'Bob Builder' }]
		});

		expect(profile).toMatchObject({
			email: 'alice@example.com',
			initials: 'AW',
			attendanceStatus: 1,
			needBed: true,
			isVegan: true,
			companions: [{ name: 'Bob Builder' }]
		});
		const rows = await testDb.select().from(companion).where(eq(companion.guestId, g.id));
		expect(rows.map((r) => r.name)).toEqual(['Bob Builder']);
	});
});

describe('deleteProfile', () => {
	it('removes the guest and cascades companions', async () => {
		const g = await createGuest();
		await testDb.insert(companion).values({ guestId: g.id, name: 'Friend Ly' });
		await deleteProfile(g.id);
		expect(await getProfile(g.id)).toBeNull();
		expect(await testDb.select().from(companion)).toHaveLength(0);
	});
});
