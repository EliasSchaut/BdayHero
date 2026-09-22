import { z } from 'zod';
import { AttendanceStatus } from '$lib/types/guest';

/** Names start with a capital letter; used as HTML `pattern` and in zod. */
export const NAME_PATTERN_HTML = '^[A-ZÖÄÜ][A-Za-zÖÄÜöäüß \\-]*$';
export const NAME_PATTERN = new RegExp(NAME_PATTERN_HTML);

export const nameSchema = z.string().trim().min(2).max(20).regex(NAME_PATTERN);

/** Treat missing fields and blank strings as "not provided". */
const blankToUndefined = (v: unknown) =>
	v == null || (typeof v === 'string' && v.trim() === '') ? undefined : v;

const optionalName = z.preprocess(blankToUndefined, nameSchema.optional());

const bool = z.preprocess((v) => v === true || v === 'true' || v === 'on', z.boolean());

const attendance = z.preprocess(
	(v) => (typeof v === 'string' && v !== '' ? Number(v) : v),
	z
		.number()
		.int()
		.min(AttendanceStatus.NOT_RESPONDED)
		.max(AttendanceStatus.MAYBE_ATTENDING)
		.default(AttendanceStatus.NOT_RESPONDED)
);

export const companionSchema = z.object({ name: nameSchema });

export function guestUpdateSchema(maxCompanions: number) {
	return z.object({
		firstName: optionalName,
		lastName: optionalName,
		bio: z.preprocess(blankToUndefined, z.string().trim().max(20).optional()),
		attendanceStatus: attendance,
		profilePublic: bool.default(false),
		needBed: bool.default(false),
		hasBed: bool.default(false),
		isVegan: bool.default(false),
		companions: z.array(companionSchema).max(maxCompanions).default([])
	});
}

export type GuestUpdateInput = z.infer<ReturnType<typeof guestUpdateSchema>>;

export const emailSchema = z.object({ email: z.email().max(255) });

/** Converts the RSVP form's FormData into the object shape expected by the schema. */
export function guestUpdateFromFormData(form: FormData): Record<string, unknown> {
	return {
		firstName: form.get('firstName'),
		lastName: form.get('lastName'),
		bio: form.get('bio'),
		attendanceStatus: form.get('attendanceStatus'),
		profilePublic: form.get('profilePublic'),
		needBed: form.get('needBed'),
		hasBed: form.get('hasBed'),
		isVegan: form.get('isVegan'),
		companions: form
			.getAll('companions')
			.filter((n) => typeof n === 'string' && n.trim() !== '')
			.map((name) => ({ name }))
	};
}
