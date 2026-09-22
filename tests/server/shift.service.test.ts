import { beforeEach, describe, expect, it } from 'vitest';
import { createGuest, createShift, resetDb } from '../setup/fixtures';
import { ApiError } from '$lib/server/api/errors';
import { assignSlot, listShifts, mySlotIds, unassignSlot } from '$lib/server/services/shift';

beforeEach(resetDb);

describe('assignSlot', () => {
	it('respects the capacity and is idempotent', async () => {
		const { slots } = await createShift(1);
		const a = await createGuest();
		const b = await createGuest();

		await assignSlot(a.id, slots[0].id);
		await assignSlot(a.id, slots[0].id); // same guest again: no error, no duplicate
		expect(await mySlotIds(a.id)).toEqual([slots[0].id]);

		await expect(assignSlot(b.id, slots[0].id)).rejects.toMatchObject({
			code: 'WARNING',
			status: 409
		});
	});

	it('fills up to the capacity when it is larger than one', async () => {
		const { slots } = await createShift(2);
		const a = await createGuest();
		const b = await createGuest();
		const c = await createGuest();
		await assignSlot(a.id, slots[0].id);
		await assignSlot(b.id, slots[0].id);
		await expect(assignSlot(c.id, slots[0].id)).rejects.toBeInstanceOf(ApiError);
		const [shift] = await listShifts('en');
		expect(shift.slots[0]).toMatchObject({ assigned: 2, capacity: 2 });
	});

	it('rejects unknown slots', async () => {
		const a = await createGuest();
		await expect(assignSlot(a.id, 999)).rejects.toMatchObject({ status: 404 });
	});
});

describe('unassignSlot', () => {
	it('fails when the guest does not hold the slot', async () => {
		const { slots } = await createShift();
		const a = await createGuest();
		await expect(unassignSlot(a.id, slots[0].id)).rejects.toMatchObject({ status: 400 });
		await assignSlot(a.id, slots[0].id);
		await unassignSlot(a.id, slots[0].id);
		expect(await mySlotIds(a.id)).toEqual([]);
	});
});

describe('listShifts', () => {
	it('localises names and anonymises private guests except the viewer', async () => {
		const { slots } = await createShift(3);
		const pub = await createGuest({ firstName: 'Paula', lastName: 'Public', profilePublic: true });
		const priv = await createGuest({
			firstName: 'Peter',
			lastName: 'Private',
			profilePublic: false
		});
		await assignSlot(pub.id, slots[0].id);
		await assignSlot(priv.id, slots[0].id);

		const [de] = await listShifts('de');
		expect(de.name).toBe('Theke');
		const [en] = await listShifts('en', priv.id);
		expect(en.name).toBe('Bar');
		const names = en.slots[0].guests.map((g) => g.name).sort();
		expect(names).toEqual(['Paula Public', 'Peter Private']);

		const [anon] = await listShifts('en', null);
		const hidden = anon.slots[0].guests.find((g) => g.id === priv.id);
		expect(hidden).toMatchObject({ name: null, initials: '?', image: null });
	});
});
