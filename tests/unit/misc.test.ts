import { describe, expect, it } from 'vitest';
import { alertTypeFor } from '$lib/utils/alert-map';
import { freePlaces } from '$lib/server/services/shift';
import { isTheme } from '$lib/utils/theme';
import { formatTime } from '$lib/utils/date';

describe('alertTypeFor', () => {
	it('maps response codes to alert variants', () => {
		expect(alertTypeFor('SUCCESS')).toBe('success');
		expect(alertTypeFor('INFO')).toBe('info');
		expect(alertTypeFor('WARNING')).toBe('warn');
		expect(alertTypeFor('DANGER')).toBe('danger');
		expect(alertTypeFor('FORBIDDEN')).toBe('danger');
	});
});

describe('freePlaces', () => {
	it('never goes negative', () => {
		expect(freePlaces(2, 0)).toBe(2);
		expect(freePlaces(2, 2)).toBe(0);
		expect(freePlaces(2, 5)).toBe(0);
	});
});

describe('isTheme', () => {
	it('accepts only known themes', () => {
		expect(isTheme('dark')).toBe(true);
		expect(isTheme('blue')).toBe(false);
		expect(isTheme(undefined)).toBe(false);
	});
});

describe('formatTime', () => {
	it('formats in Europe/Berlin time', () => {
		expect(formatTime('2026-06-03T16:00:00Z')).toBe('18:00');
	});
});
