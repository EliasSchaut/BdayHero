/**
 * Seeds example shifts (bilingual) with time slots. Idempotent: skips if shifts exist.
 * Self-contained (plain SQL through drizzle) so it also runs inside the runtime image:
 *   pnpm db:seed                        # locally (.env)
 *   docker compose exec app node scripts/seed-shifts.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { sql } from 'drizzle-orm';

const url = process.env.DATABASE_URL ?? readEnvFile('DATABASE_URL');
if (!url) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}

const EVENT_DAY = '2027-06-05';
/** @param {string} time */
const at = (time) => new Date(`${EVENT_DAY}T${time}:00+02:00`);

/** @type {Array<{ en: [string, string]; de: [string, string]; slots: Array<[string, string, number]> }>} */
const shifts = [
	{
		en: ['Bar', 'Mix cocktails and tap beer'],
		de: ['Bar', 'Cocktails mixen und Bier zapfen'],
		slots: [
			['18:00', '19:30', 2],
			['19:30', '21:00', 2],
			['21:00', '22:30', 2],
			['22:30', '00:00', 2]
		]
	},
	{
		en: ['Grill', 'Keep the barbecue running'],
		de: ['Grill', 'Den Grill am Laufen halten'],
		slots: [
			['18:30', '20:00', 2],
			['20:00', '21:30', 2]
		]
	},
	{
		en: ['Check-in', 'Welcome guests, hand out tokens'],
		de: ['Check-in', 'Gäste begrüßen, Tokens verteilen'],
		slots: [
			['18:00', '19:00', 1],
			['19:00', '20:00', 1]
		]
	},
	{
		en: ['Clean-up', 'The morning after'],
		de: ['Aufräumen', 'Am Morgen danach'],
		slots: [['10:00', '12:00', 6]]
	}
];

const { db, close } = await connect(url);
try {
	const existing = await db.execute(sql`select id from shift limit 1`);
	if (rows(existing).length > 0) {
		console.log('[seed] shifts already exist, skipping');
	} else {
		let order = 0;
		for (const s of shifts) {
			const inserted = await db.execute(
				sql`insert into shift (sort_order) values (${order++}) returning id`
			);
			const shiftId = rows(inserted)[0].id;
			await db.execute(
				sql`insert into shift_info (shift_id, lang, name, description) values
					(${shiftId}, 'en', ${s.en[0]}, ${s.en[1]}),
					(${shiftId}, 'de', ${s.de[0]}, ${s.de[1]})`
			);
			for (const [start, end, capacity] of s.slots) {
				const startAt = at(start);
				const endAt = at(end);
				if (endAt <= startAt) endAt.setDate(endAt.getDate() + 1); // slot ends after midnight
				await db.execute(
					sql`insert into shift_slot (shift_id, start_at, end_at, capacity)
						values (${shiftId}, ${startAt.toISOString()}::timestamptz, ${endAt.toISOString()}::timestamptz, ${capacity})`
				);
			}
		}
		console.log(`[seed] inserted ${shifts.length} shifts`);
	}
} finally {
	await close();
}

/** @param {string} url */
async function connect(url) {
	if (url.startsWith('pglite://')) {
		const { drizzle } = await import('drizzle-orm/pglite');
		const target = url.slice('pglite://'.length);
		const dataDir = target === '' || target === 'memory' ? undefined : target;
		const db = drizzle({ connection: { dataDir } });
		return { db, close: () => db.$client.close() };
	}
	const { drizzle } = await import('drizzle-orm/postgres-js');
	const postgres = (await import('postgres')).default;
	const client = postgres(url, { max: 1, onnotice: () => {} });
	return { db: drizzle(client), close: () => client.end() };
}

/** drizzle's execute() returns `{ rows }` for PGlite and an array for postgres.js
 * @param {any} result @returns {any[]} */
function rows(result) {
	return Array.isArray(result) ? result : result.rows;
}

/** @param {string} key */
function readEnvFile(key) {
	const file = resolve(process.cwd(), '.env');
	if (!existsSync(file)) return undefined;
	const line = readFileSync(file, 'utf8')
		.split('\n')
		.find((l) => l.startsWith(`${key}=`));
	return line?.slice(key.length + 1).replace(/^["']|["']$/g, '');
}
