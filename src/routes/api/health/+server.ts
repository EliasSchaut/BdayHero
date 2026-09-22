import { sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

/** Liveness/readiness probe used by Docker. Not blocked in hero-only mode. */
export const GET: RequestHandler = async () => {
	try {
		await db.execute(sql`select 1`);
		return json({ status: 'ok', db: 'up' });
	} catch (e) {
		console.error('[health] database unreachable', e);
		return json({ status: 'degraded', db: 'down' }, { status: 503 });
	}
};
