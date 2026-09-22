/**
 * Vitest setup for the `server` project: every test file gets a fresh
 * in-memory PGlite database with all migrations applied, and `$lib/server/db`
 * is redirected to it so services and API handlers run against it.
 */
import { vi, afterAll } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import * as schema from '../../src/lib/server/db/schema.ts';

process.env.BETTER_AUTH_SECRET ??= 'test-secret-test-secret-test-secret-1234';
process.env.BETTER_AUTH_URL ??= 'http://localhost:4173';
process.env.ORIGIN ??= 'http://localhost:4173';
process.env.EMAIL_TRANSPORT ??= 'json';

const client = new PGlite();
export const testDb = drizzle(client, { schema, casing: 'snake_case' });
await migrate(testDb, { migrationsFolder: 'drizzle' });

vi.mock('$lib/server/db', () => ({ db: testDb, schema }));

afterAll(async () => {
	await client.close();
});
