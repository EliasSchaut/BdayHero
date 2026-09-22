import { expect, test } from '@playwright/test';

test('landing page renders the hero and links to registration', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Kids Bday/);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Save');
	await expect(page.getByRole('link', { name: 'JOIN NOW' })).toHaveAttribute('href', '/guests');
	await expect(
		page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Shifts' })
	).toBeVisible();
	// feature cards are served as optimised pictures
	expect(await page.locator('picture source[type="image/avif"]').count()).toBeGreaterThan(0);
});

test('unknown urls return a 404 page', async ({ page }) => {
	const response = await page.goto('/does-not-exist');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
});
