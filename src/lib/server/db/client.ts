import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import postgres from 'postgres';
import * as schema from './schema.ts';

/** Common Drizzle handle type shared by the Postgres and PGlite drivers. */
export type Database = PgDatabase<PgQueryResultHKT, typeof schema>;

export const PGLITE_PREFIX = 'pglite://';

export function isPgliteUrl(url: string | undefined): url is string {
	return !!url && url.startsWith(PGLITE_PREFIX);
}

/** Resolve the PGlite data directory from a `pglite://` URL (`memory` = in-memory). */
export function pgliteDataDir(url: string): string | undefined {
	const target = url.slice(PGLITE_PREFIX.length);
	return target === '' || target === 'memory' ? undefined : target;
}

type Closable = { close?: () => Promise<void>; end?: () => Promise<void> };
const clients = new WeakMap<Database, Closable>();

export function createDb(url: string | undefined): Database {
	if (!url) throw new Error('DATABASE_URL is not set');
	if (isPgliteUrl(url)) {
		const db = drizzlePglite({
			connection: { dataDir: pgliteDataDir(url) },
			schema,
			casing: 'snake_case'
		});
		clients.set(db, db.$client);
		return db;
	}
	const client = postgres(url, { onnotice: () => {} });
	const db = drizzlePostgres(client, { schema, casing: 'snake_case' });
	clients.set(db, client);
	return db;
}

/** Close the underlying connection (scripts only; the server keeps its pool open). */
export async function closeDb(db: Database): Promise<void> {
	const client = clients.get(db);
	if (client?.close) await client.close();
	else if (client?.end) await client.end();
}
