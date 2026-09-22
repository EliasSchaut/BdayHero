import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Read the magic-link URL from the newest mail written by EMAIL_TRANSPORT=file. */
function latestMagicLink(): string {
	const dir = '.mails';
	const newest = readdirSync(dir)
		.map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
		.sort((a, b) => b.t - a.t)[0];
	const mail = JSON.parse(readFileSync(join(dir, newest.f), 'utf8'));
	const match = String(mail.text).match(/https?:\/\/\S+magic-link\/verify\S*/);
	if (!match) throw new Error('no magic link in mail');
	return match[0];
}

test('magic-link sign-in, RSVP update, shift sign-up and account deletion', async ({ page }) => {
	const email = `e2e-${Date.now()}@example.com`;

	await page.goto('/guests');
	await page.getByPlaceholder('sign in local via email').fill(email);
	await page.getByRole('button', { name: 'Sign in', exact: true }).click();
	await expect(page.getByRole('status')).toContainText('You have got mail');

	await expect.poll(() => latestMagicLink(), { timeout: 5000 }).toContain('token=');
	await page.goto(latestMagicLink());
	await expect(page).toHaveURL(/\/guests$/);
	await expect(page.getByRole('status')).toContainText('Signed in successfully');

	// fill the RSVP form
	await page.getByRole('radio', { name: 'Attend' }).click();
	await page.getByLabel('First name').fill('Alice');
	await page.getByLabel('Last name').fill('Wonder');
	await page.getByRole('switch', { name: 'Public in guest list' }).click();
	await page.locator('#numCompanions').selectOption('1');
	await page.getByLabel('1. Companion name').fill('Bob Builder');
	await page.getByPlaceholder('Add message (optional)').fill('Hi there');
	await page.getByRole('button', { name: 'Update' }).click();
	await expect(page.getByRole('status')).toContainText('Profile updated');

	// public guest list shows the profile with the companion badge
	const card = page.locator('text=Alice').first();
	await expect(card).toBeVisible();
	await expect(page.getByTitle('Bob Builder')).toHaveText('+1');

	// take and drop a shift
	await page.goto('/shifts');
	await page.getByRole('button', { name: 'Take' }).first().click();
	await expect(page.getByText('Acquired')).toBeVisible();
	await page.getByRole('button', { name: 'Drop' }).first().click();
	await expect(page.getByText('Acquired')).toHaveCount(0);

	// delete the account
	await page.goto('/guests');
	await page.getByRole('button', { name: 'Open profile menu' }).click();
	await page.getByRole('menuitem', { name: 'Delete account' }).click();
	await page.getByRole('button', { name: 'Delete permanently' }).click();
	await expect(page.getByRole('status')).toContainText('Your account has been deleted');
	await expect(page.getByRole('heading', { name: 'Sign in to join!' })).toBeVisible();
});
