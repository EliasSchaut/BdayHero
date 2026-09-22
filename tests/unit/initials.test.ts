import { describe, expect, it } from 'vitest';
import { generateInitials } from '$lib/utils/initials';

describe('generateInitials', () => {
	it('uses first and last name', () => {
		expect(generateInitials({ firstName: 'alice', lastName: 'wonder', email: 'a@b.c' })).toBe('AW');
	});
	it('falls back to the e-mail when a name part is missing', () => {
		expect(generateInitials({ firstName: 'Alice', email: 'zed@example.com' })).toBe('Z');
		expect(generateInitials({ email: 'bob@example.com' })).toBe('B');
	});
});
