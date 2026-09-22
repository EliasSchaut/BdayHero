import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createGuest, createShift, event, resetDb } from '../setup/fixtures';
import { GET as getGuests } from '../../src/routes/api/guests/+server';
import {
	GET as getMe,
	PATCH as patchMe,
	DELETE as deleteMe
} from '../../src/routes/api/guests/me/+server';
import { GET as getShifts } from '../../src/routes/api/shifts/+server';
import {
	POST as assign,
	DELETE as unassign
} from '../../src/routes/api/shifts/slots/[id]/assign/+server';
import { GET as health } from '../../src/routes/api/health/+server';

vi.mock('$lib/server/auth', () => ({
	auth: { api: { signOut: vi.fn(async () => ({ success: true })) }, options: {} }
}));
vi.mock('$lib/server/avatar/gravatar', () => ({ lookupGravatar: async () => null }));
vi.mock('$env/dynamic/public', () => ({ env: { PUBLIC_MAX_COMPANIONS_PER_GUEST: '1' } }));

beforeEach(resetDb);

const call = async (res: Response | Promise<Response>) => {
	const r = await res;
	return { status: r.status, body: await r.json() };
};

describe('GET /api/health', () => {
	it('reports the database as up', async () => {
		const { status, body } = await call(
			health(event({ url: 'http://localhost/api/health' }) as never)
		);
		expect(status).toBe(200);
		expect(body).toEqual({ status: 'ok', db: 'up' });
	});
});

describe('GET /api/guests', () => {
	it('returns anonymised guests and the headcount', async () => {
		await createGuest({ profilePublic: false });
		const { status, body } = await call(getGuests(event({}) as never));
		expect(status).toBe(200);
		expect(body.ok).toBe(true);
		expect(body.data.count).toBe(1);
		expect(body.data.guests[0].email).toBe('Anonym');
	});
});

describe('/api/guests/me', () => {
	it('requires a session', async () => {
		const { status, body } = await call(getMe(event({}) as never));
		expect(status).toBe(401);
		expect(body).toMatchObject({ ok: false, code: 'FORBIDDEN' });
	});

	it('updates the profile and enforces the companion limit', async () => {
		const g = await createGuest();
		const okRes = await call(
			patchMe(
				event({
					user: g,
					method: 'PATCH',
					body: {
						firstName: 'Alice',
						lastName: 'Wonder',
						attendanceStatus: 1,
						companions: [{ name: 'Bob Builder' }]
					}
				}) as never
			)
		);
		expect(okRes.status).toBe(200);
		expect(okRes.body.data).toMatchObject({
			initials: 'AW',
			companions: [{ name: 'Bob Builder' }]
		});

		const tooMany = await call(
			patchMe(
				event({
					user: g,
					method: 'PATCH',
					body: { companions: [{ name: 'Anna Apple' }, { name: 'Bob Builder' }] }
				}) as never
			)
		);
		expect(tooMany.status).toBe(400);
		expect(tooMany.body.message).toContain('1');

		const invalid = await call(
			patchMe(event({ user: g, method: 'PATCH', body: { firstName: 'x' } }) as never)
		);
		expect(invalid.status).toBe(400);
		expect(invalid.body.issues?.[0].path).toBe('firstName');
	});

	it('deletes the account', async () => {
		const g = await createGuest();
		const { status, body } = await call(deleteMe(event({ user: g, method: 'DELETE' }) as never));
		expect(status).toBe(200);
		expect(body.code).toBe('INFO');
		expect((await call(getMe(event({ user: g }) as never))).status).toBe(401);
	});
});

describe('/api/shifts', () => {
	it('localises via ?lang and assigns/unassigns slots', async () => {
		const { slots } = await createShift(1);
		const a = await createGuest();
		const b = await createGuest();

		const de = await call(
			getShifts(event({ url: 'http://localhost/api/shifts?lang=de' }) as never)
		);
		expect(de.body.data[0].name).toBe('Theke');

		const params = { id: String(slots[0].id) };
		expect((await call(assign(event({ user: a, method: 'POST', params }) as never))).status).toBe(
			200
		);
		const full = await call(assign(event({ user: b, method: 'POST', params }) as never));
		expect(full.status).toBe(409);
		expect(full.body.code).toBe('WARNING');

		const notMine = await call(unassign(event({ user: b, method: 'DELETE', params }) as never));
		expect(notMine.status).toBe(400);
		expect(
			(await call(unassign(event({ user: a, method: 'DELETE', params }) as never))).status
		).toBe(200);

		const bad = await call(
			assign(event({ user: a, method: 'POST', params: { id: 'abc' } }) as never)
		);
		expect(bad.status).toBe(400);
	});
});
