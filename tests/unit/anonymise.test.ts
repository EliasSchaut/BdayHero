import { describe, expect, it } from 'vitest';
import { anonymiseIfNotPublic } from '$lib/utils/anonymise';
import type { PublicGuest } from '$lib/types/guest';

const guest: PublicGuest = {
	id: 'id-1',
	email: 'alice@example.com',
	initials: 'AW',
	firstName: 'Alice',
	lastName: 'Wonder',
	image: 'https://img',
	bio: 'hi',
	attendanceStatus: 1,
	profilePublic: false,
	companions: [{ name: 'Bob' }]
};

describe('anonymiseIfNotPublic', () => {
	it('strips personal data for private profiles but keeps id and attendance', () => {
		const a = anonymiseIfNotPublic(guest);
		expect(a).toEqual({
			id: 'id-1',
			email: 'Anonym',
			initials: '?',
			firstName: null,
			lastName: null,
			image: null,
			bio: null,
			attendanceStatus: 1,
			profilePublic: false,
			companions: []
		});
	});
	it('returns public profiles untouched', () => {
		const pub = { ...guest, profilePublic: true };
		expect(anonymiseIfNotPublic(pub)).toBe(pub);
	});
});
