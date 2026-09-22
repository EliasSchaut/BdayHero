/**
 * Seeds example shifts (bilingual) with time slots. Idempotent: skips if shifts exist.
 * Run with `pnpm db:seed` (Node 24 strips the types natively).
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { closeDb, createDb } from '../src/lib/server/db/client.ts';
import { shift, shiftInfo, shiftSlot } from '../src/lib/server/db/schema.ts';

const url = process.env.DATABASE_URL ?? readEnvFile('DATABASE_URL');
const db = createDb(url);

const EVENT_DAY = '2026-06-03';
const at = (time: string) => new Date(`${EVENT_DAY}T${time}:00+02:00`);

const shifts = [
	{
		en: { name: 'Bar', description: 'Mix cocktails and tap beer' },
		de: { name: 'Bar', description: 'Cocktails mixen und Bier zapfen' },
		slots: [
			['18:00', '19:30', 2],
			['19:30', '21:00', 2],
			['21:00', '22:30', 2],
			['22:30', '00:00', 2]
		]
	},
	{
		en: { name: 'Grill', description: 'Keep the barbecue running' },
		de: { name: 'Grill', description: 'Den Grill am Laufen halten' },
		slots: [
			['18:30', '20:00', 2],
			['20:00', '21:30', 2]
		]
	},
	{
		en: { name: 'Check-in', description: 'Welcome guests, hand out tokens' },
		de: { name: 'Check-in', description: 'Gäste begrüßen, Tokens verteilen' },
		slots: [
			['18:00', '19:00', 1],
			['19:00', '20:00', 1]
		]
	},
	{
		en: { name: 'Clean-up', description: 'The morning after' },
		de: { name: 'Aufräumen', description: 'Am Morgen danach' },
		slots: [['10:00', '12:00', 6]]
	}
] as const;

const existing = await db.select({ id: shift.id }).from(shift).limit(1);
if (existing.length > 0) {
	console.log('[seed] shifts already exist, skipping');
} else {
	let order = 0;
	for (const s of shifts) {
		const [row] = await db.insert(shift).values({ sortOrder: order++ }).returning({ id: shift.id });
		await db.insert(shiftInfo).values([
			{ shiftId: row.id, lang: 'en', ...s.en },
			{ shiftId: row.id, lang: 'de', ...s.de }
		]);
		await db.insert(shiftSlot).values(
			s.slots.map(([start, end, capacity]) => {
				const endAt = at(end);
				const startAt = at(start);
				// slots ending after midnight roll over to the next day
				if (endAt <= startAt) endAt.setDate(endAt.getDate() + 1);
				return { shiftId: row.id, startAt, endAt, capacity };
			})
		);
	}
	console.log(`[seed] inserted ${shifts.length} shifts`);
}

await closeDb(db);

function readEnvFile(key: string): string | undefined {
	const file = resolve(process.cwd(), '.env');
	if (!existsSync(file)) return undefined;
	const line = readFileSync(file, 'utf8')
		.split('\n')
		.find((l) => l.startsWith(`${key}=`));
	return line?.slice(key.length + 1).replace(/^["']|["']$/g, '');
}
