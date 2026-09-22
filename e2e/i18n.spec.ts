import { expect, test } from '@playwright/test';

test('language toggle switches to German and persists via cookie', async ({ page, context }) => {
	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await page
		.getByRole('navigation', { name: 'Main' })
		.getByRole('button', { name: 'German' })
		.click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'de');
	await expect(page.getByRole('link', { name: 'JETZT ANMELDEN' })).toBeVisible();
	const cookies = await context.cookies();
	expect(cookies.find((c) => c.name === 'locale')?.value).toBe('de');

	await page.goto('/details');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Details');
	await expect(page.getByText('Zeitreise', { exact: false })).toBeVisible();
});

test('Accept-Language header selects the locale for first-time visitors', async ({ browser }) => {
	const context = await browser.newContext({ locale: 'de-DE' });
	const page = await context.newPage();
	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('lang', 'de');
	await context.close();
});
