import { defineEnvVars } from '@sveltejs/kit/env';
import { z } from 'zod';

/**
 * Environment variables, read when the app starts (not inlined at build time) so the
 * Docker image can be configured at runtime. All are optional here: callers apply their
 * own defaults (`?? 'BdayHero'`, `?? 587`, ...) and required production settings are
 * documented in docs/deployment.md.
 */
const optional = (description: string) => ({ schema: z.string().optional(), description });

export const variables = defineEnvVars({
	PUBLIC_HERO_ONLY: {
		public: true,
		...optional('Only show the landing page (`true`/`1`/`yes`/`on`).')
	},
	PUBLIC_MAX_COMPANIONS_PER_GUEST: {
		public: true,
		...optional('Companions a guest may bring, defaults to 1.')
	},
	PROJ_TITLE: optional('Project title used in mails and as auth app name.'),
	ORIGIN: optional('Public URL of the app (also read by adapter-node).'),
	DATABASE_URL: optional('`postgres://…` or `pglite://<dir>`.'),
	BETTER_AUTH_URL: optional('Auth base URL, defaults to ORIGIN.'),
	BETTER_AUTH_SECRET: optional('Secret for signing auth tokens (>= 32 chars).'),
	GITHUB_CLIENT_ID: optional('GitHub OAuth client id; enables GitHub sign-in.'),
	GITHUB_CLIENT_SECRET: optional('GitHub OAuth client secret.'),
	GOOGLE_CLIENT_ID: optional('Google OAuth client id; enables Google sign-in.'),
	GOOGLE_CLIENT_SECRET: optional('Google OAuth client secret.'),
	DISCORD_CLIENT_ID: optional('Discord OAuth client id; enables Discord sign-in.'),
	DISCORD_CLIENT_SECRET: optional('Discord OAuth client secret.'),
	EMAIL_TRANSPORT: optional('`json` (stdout) or `file` (EMAIL_FILE_DIR) instead of SMTP.'),
	EMAIL_FILE_DIR: optional('Target directory for EMAIL_TRANSPORT=file, defaults to `.mails`.'),
	EMAIL_HOST: optional('SMTP host.'),
	EMAIL_PORT: optional('SMTP port, defaults to 587.'),
	EMAIL_SECURE: optional('Use implicit TLS (`true`).'),
	EMAIL_HOST_USER: optional('SMTP user.'),
	EMAIL_HOST_PASSWORD: optional('SMTP password.'),
	EMAIL_FROM: optional('Sender address, defaults to EMAIL_HOST_USER.')
});
