import { describe, expect, it } from 'vitest';
import { guestUpdateFromFormData, guestUpdateSchema, nameSchema } from '$lib/schemas/guest';

describe('nameSchema', () => {
	it('accepts capitalised names incl. umlauts and hyphens', () => {
		expect(nameSchema.safeParse('Ölaf').success).toBe(true);
		expect(nameSchema.safeParse('Anna-Lena Müller').success).toBe(true);
	});
	it('rejects lowercase, too short and too long names', () => {
		expect(nameSchema.safeParse('bob').success).toBe(false);
		expect(nameSchema.safeParse('B').success).toBe(false);
		expect(nameSchema.safeParse('A'.repeat(21)).success).toBe(false);
	});
});

describe('guestUpdateSchema', () => {
	const schema = guestUpdateSchema(1);

	it('coerces form values', () => {
		const form = new FormData();
		form.set('firstName', 'Alice');
		form.set('lastName', '');
		form.set('attendanceStatus', '2');
		form.set('profilePublic', 'on');
		form.append('companions', 'Bob Builder');
		form.append('companions', '   ');
		const parsed = schema.parse(guestUpdateFromFormData(form));
		expect(parsed).toMatchObject({
			firstName: 'Alice',
			lastName: undefined,
			attendanceStatus: 2,
			profilePublic: true,
			needBed: false,
			companions: [{ name: 'Bob Builder' }]
		});
	});

	it('enforces the companion limit and attendance range', () => {
		expect(
			schema.safeParse({ companions: [{ name: 'Anna Apple' }, { name: 'Bob Builder' }] }).success
		).toBe(false);
		expect(schema.safeParse({ attendanceStatus: 3 }).success).toBe(false);
		expect(schema.safeParse({ attendanceStatus: -1 }).success).toBe(true);
	});

	it('caps the bio at 20 characters', () => {
		expect(schema.safeParse({ bio: 'x'.repeat(21) }).success).toBe(false);
		expect(schema.safeParse({ bio: 'x'.repeat(20) }).success).toBe(true);
	});
});
