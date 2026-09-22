import { expect, test } from '@playwright/test';

test.use({ baseURL: 'http://localhost:4174' });

test('hero-only mode hides registration but keeps the legal pages', async ({ page, request }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Registration opens soon' })).toBeDisabled();
	await expect(page.getByRole('link', { name: 'JOIN NOW' })).toHaveCount(0);
	const nav = page.getByRole('navigation', { name: 'Main' });
	await expect(nav.getByRole('link', { name: 'Home' })).toHaveCount(0);
	await expect(nav.getByRole('link', { name: 'Guests' })).toHaveCount(0);

	await page.goto('/guests');
	await expect(page).toHaveURL('http://localhost:4174/');
	await page.goto('/shifts');
	await expect(page).toHaveURL('http://localhost:4174/');

	expect((await request.get('/imprint')).status()).toBe(200);
	expect((await request.get('/api/health')).status()).toBe(200);
	const guests = await request.get('/api/guests');
	expect(guests.status()).toBe(404);
	expect(await guests.json()).toMatchObject({ ok: false, code: 'FORBIDDEN' });
});
