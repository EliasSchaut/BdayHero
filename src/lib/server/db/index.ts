import { env } from '$env/dynamic/private';
import { createDb, type Database } from './client';

/**
 * Application database handle.
 *
 * `DATABASE_URL` may point to a Postgres server (`postgres://...`) or, for local
 * development and end-to-end tests without Docker, to an embedded PGlite
 * database (`pglite://./.pglite` or `pglite://memory`).
 */
export const db: Database = createDb(env.DATABASE_URL);

export * as schema from './schema';
