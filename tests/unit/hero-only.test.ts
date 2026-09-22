import { describe, expect, it } from 'vitest';
import { isBlockedApi, isBlockedPage } from '$lib/hero-only';

describe('hero-only path matching', () => {
	it('blocks guest, shift and details pages', () => {
		for (const p of ['/guests', '/guests/verified', '/shifts', '/details']) {
			expect(isBlockedPage(p)).toBe(true);
		}
	});
	it('keeps landing, imprint and privacy reachable', () => {
		for (const p of ['/', '/imprint', '/privacy', '/guestsbook']) {
			expect(isBlockedPage(p)).toBe(false);
		}
	});
	it('blocks guest/shift/auth APIs but not health', () => {
		expect(isBlockedApi('/api/guests/me')).toBe(true);
		expect(isBlockedApi('/api/shifts')).toBe(true);
		expect(isBlockedApi('/api/auth/get-session')).toBe(true);
		expect(isBlockedApi('/api/health')).toBe(false);
	});
});
