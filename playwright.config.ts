import { defineConfig, devices } from '@playwright/test';

/**
 * Two production servers are started from `build/`:
 *  - :4173 normal mode
 *  - :4174 hero-only mode (PUBLIC_HERO_ONLY=true)
 * Both run on embedded PGlite databases so no Postgres is needed.
 * Run `pnpm build` first (the `test:e2e` script does).
 */
const common = {
	ORIGIN: '',
	BETTER_AUTH_SECRET: 'e2e-secret-e2e-secret-e2e-secret-1234',
	EMAIL_TRANSPORT: 'file',
	EMAIL_FILE_DIR: '.mails',
	PROJ_TITLE: 'KidsBday',
	PUBLIC_MAX_COMPANIONS_PER_GUEST: '1'
};

const server = (port: number, dir: string, extra: Record<string, string>) => ({
	command: `node scripts/migrate.mjs && node scripts/seed-shifts.ts && node build`,
	port,
	reuseExistingServer: !process.env.CI,
	env: {
		...common,
		...extra,
		PORT: String(port),
		ORIGIN: `http://localhost:${port}`,
		BETTER_AUTH_URL: `http://localhost:${port}`,
		DATABASE_URL: `pglite://./${dir}`
	}
});

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: false,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4173' },
	webServer: [
		server(4173, '.pglite-e2e', { PUBLIC_HERO_ONLY: 'false' }),
		server(4174, '.pglite-e2e-hero', { PUBLIC_HERO_ONLY: 'true' })
	]
});
