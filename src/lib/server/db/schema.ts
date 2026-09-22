import { relations, sql } from 'drizzle-orm';
import {
	boolean,
	check,
	index,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	smallint,
	text,
	timestamp,
	unique,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const langEnum = pgEnum('lang', ['en', 'de']);

const timestamps = {
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
};

// ---------------------------------------------------------------------------
// Better Auth core tables. The `user` table doubles as the guest profile.
// ---------------------------------------------------------------------------

export const user = pgTable(
	'user',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull().default(''),
		email: text('email').notNull().unique(),
		emailVerified: boolean('email_verified').notNull().default(false),
		image: text('image'),
		...timestamps,
		// guest profile
		firstName: varchar('first_name', { length: 20 }),
		lastName: varchar('last_name', { length: 20 }),
		initials: varchar('initials', { length: 2 }),
		bio: varchar('bio', { length: 20 }),
		attendanceStatus: smallint('attendance_status').notNull().default(-1),
		profilePublic: boolean('profile_public').notNull().default(false),
		needBed: boolean('need_bed').notNull().default(false),
		hasBed: boolean('has_bed').notNull().default(false),
		isVegan: boolean('is_vegan').notNull().default(false)
	},
	(t) => [
		index('user_profile_public_idx').on(t.profilePublic),
		check('user_attendance_status_check', sql`${t.attendanceStatus} between -1 and 2`)
	]
);

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		token: text('token').notNull().unique(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		...timestamps
	},
	(t) => [index('session_user_id_idx').on(t.userId)]
);

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
		scope: text('scope'),
		password: text('password'),
		...timestamps
	},
	(t) => [
		index('account_user_id_idx').on(t.userId),
		unique('account_provider_account_unique').on(t.providerId, t.accountId)
	]
);

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
		...timestamps
	},
	(t) => [index('verification_identifier_idx').on(t.identifier)]
);

// ---------------------------------------------------------------------------
// Domain tables
// ---------------------------------------------------------------------------

export const companion = pgTable(
	'companion',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name', { length: 20 }).notNull(),
		guestId: text('guest_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(t) => [index('companion_guest_id_idx').on(t.guestId)]
);

export const shift = pgTable('shift', {
	id: serial('id').primaryKey(),
	sortOrder: integer('sort_order').notNull().default(0)
});

export const shiftInfo = pgTable(
	'shift_info',
	{
		shiftId: integer('shift_id')
			.notNull()
			.references(() => shift.id, { onDelete: 'cascade' }),
		lang: langEnum('lang').notNull(),
		name: text('name').notNull(),
		description: text('description').notNull().default('')
	},
	(t) => [primaryKey({ columns: [t.shiftId, t.lang] })]
);

export const shiftSlot = pgTable(
	'shift_slot',
	{
		id: serial('id').primaryKey(),
		shiftId: integer('shift_id')
			.notNull()
			.references(() => shift.id, { onDelete: 'cascade' }),
		startAt: timestamp('start_at', { withTimezone: true }).notNull(),
		endAt: timestamp('end_at', { withTimezone: true }).notNull(),
		capacity: integer('capacity').notNull()
	},
	(t) => [
		index('shift_slot_shift_id_idx').on(t.shiftId),
		unique('shift_slot_shift_time_unique').on(t.shiftId, t.startAt, t.endAt),
		check('shift_slot_capacity_check', sql`${t.capacity} > 0`)
	]
);

export const guestShift = pgTable(
	'guest_shift',
	{
		guestId: text('guest_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		shiftSlotId: integer('shift_slot_id')
			.notNull()
			.references(() => shiftSlot.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(t) => [
		primaryKey({ columns: [t.guestId, t.shiftSlotId] }),
		index('guest_shift_slot_id_idx').on(t.shiftSlotId)
	]
);

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const userRelations = relations(user, ({ many }) => ({
	companions: many(companion),
	guestShifts: many(guestShift),
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] })
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] })
}));

export const companionRelations = relations(companion, ({ one }) => ({
	guest: one(user, { fields: [companion.guestId], references: [user.id] })
}));

export const shiftRelations = relations(shift, ({ many }) => ({
	infos: many(shiftInfo),
	slots: many(shiftSlot)
}));

export const shiftInfoRelations = relations(shiftInfo, ({ one }) => ({
	shift: one(shift, { fields: [shiftInfo.shiftId], references: [shift.id] })
}));

export const shiftSlotRelations = relations(shiftSlot, ({ one, many }) => ({
	shift: one(shift, { fields: [shiftSlot.shiftId], references: [shift.id] }),
	assignments: many(guestShift)
}));

export const guestShiftRelations = relations(guestShift, ({ one }) => ({
	guest: one(user, { fields: [guestShift.guestId], references: [user.id] }),
	slot: one(shiftSlot, { fields: [guestShift.shiftSlotId], references: [shiftSlot.id] })
}));

export type User = typeof user.$inferSelect;
export type Companion = typeof companion.$inferSelect;
export type Shift = typeof shift.$inferSelect;
export type ShiftInfo = typeof shiftInfo.$inferSelect;
export type ShiftSlot = typeof shiftSlot.$inferSelect;
export type GuestShift = typeof guestShift.$inferSelect;
export type Lang = (typeof langEnum.enumValues)[number];
