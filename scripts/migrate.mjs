/**
 * Applies all migrations in ./drizzle to DATABASE_URL.
 * Used by `pnpm db:migrate` and by the Docker entrypoint before the server starts.
 * Supports Postgres (`postgres://`) and embedded PGlite (`pglite://<dir>`).
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.env.DATABASE_URL ?? readEnvFile('DATABASE_URL');
if (!url) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}
if (process.env.MIGRATE_ON_START === 'false') {
	console.log('[migrate] skipped (MIGRATE_ON_START=false)');
	process.exit(0);
}

const migrationsFolder = resolve(import.meta.dirname, '../drizzle');

if (url.startsWith('pglite://')) {
	const { drizzle } = await import('drizzle-orm/pglite');
	const { migrate } = await import('drizzle-orm/pglite/migrator');
	const target = url.slice('pglite://'.length);
	const dataDir = target === '' || target === 'memory' ? undefined : target;
	const db = drizzle({ connection: { dataDir } });
	await migrate(db, { migrationsFolder });
	await db.$client.close();
} else {
	const { drizzle } = await import('drizzle-orm/postgres-js');
	const { migrate } = await import('drizzle-orm/postgres-js/migrator');
	const postgres = (await import('postgres')).default;
	const client = postgres(url, { max: 1, onnotice: () => {} });
	await migrate(drizzle(client), { migrationsFolder });
	await client.end();
}
console.log('[migrate] done');

/** @param {string} key */
function readEnvFile(key) {
	const file = resolve(process.cwd(), '.env');
	if (!existsSync(file)) return undefined;
	const line = readFileSync(file, 'utf8')
		.split('\n')
		.find((l) => l.startsWith(`${key}=`));
	return line?.slice(key.length + 1).replace(/^["']|["']$/g, '');
}
