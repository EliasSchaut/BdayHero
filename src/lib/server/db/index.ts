import { env } from '$env/dynamic/private';
import { createDb, type Database } from './client';

let instance: Database | undefined;

/**
 * Lazily created so that importing server modules (e.g. during SvelteKit's
 * post-build analysis or in tests) does not require a database connection.
 */
export function getDb(): Database {
	instance ??= createDb(env.DATABASE_URL);
	return instance;
}

/**
 * Application database handle.
 *
 * `DATABASE_URL` may point to a Postgres server (`postgres://...`) or, for local
 * development and end-to-end tests without Docker, to an embedded PGlite
 * database (`pglite://./.pglite` or `pglite://memory`).
 */
export const db: Database = new Proxy({} as Database, {
	get(_target, prop) {
		const real = getDb();
		const value = Reflect.get(real, prop, real);
		return typeof value === 'function' ? value.bind(real) : value;
	}
});

export * as schema from './schema';
