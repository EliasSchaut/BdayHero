import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins/magic-link';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import { lookupGravatar } from '$lib/server/avatar/gravatar';
import { sendMail } from '$lib/server/mail';
import { generateInitials } from '$lib/utils/initials';
import { t } from '$lib/server/i18n';

const DAY = 60 * 60 * 24;

/** Fields the guest edits through our own service layer, never through Better Auth's `updateUser`. */
const guestField = <T extends 'string' | 'number' | 'boolean'>(
	type: T,
	defaultValue?: string | number | boolean
) => ({ type, required: false, input: false, defaultValue }) as const;

function createAuth() {
	return betterAuth({
		appName: env.PROJ_TITLE ?? 'BdayHero',
		baseURL: env.BETTER_AUTH_URL || env.ORIGIN || undefined,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'pg', schema }),
		emailAndPassword: { enabled: false },
		socialProviders: {
			github: {
				clientId: env.GITHUB_CLIENT_ID ?? '',
				clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
				enabled: !!env.GITHUB_CLIENT_ID
			},
			google: {
				clientId: env.GOOGLE_CLIENT_ID ?? '',
				clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
				enabled: !!env.GOOGLE_CLIENT_ID
			},
			discord: {
				clientId: env.DISCORD_CLIENT_ID ?? '',
				clientSecret: env.DISCORD_CLIENT_SECRET ?? '',
				enabled: !!env.DISCORD_CLIENT_ID
			}
		},
		user: {
			additionalFields: {
				firstName: guestField('string'),
				lastName: guestField('string'),
				initials: guestField('string'),
				bio: guestField('string'),
				attendanceStatus: guestField('number', -1),
				profilePublic: guestField('boolean', false),
				needBed: guestField('boolean', false),
				hasBed: guestField('boolean', false),
				isVegan: guestField('boolean', false)
			},
			deleteUser: { enabled: true }
		},
		session: {
			expiresIn: 180 * DAY,
			updateAge: DAY,
			cookieCache: { enabled: true, maxAge: 5 * 60 }
		},
		advanced: {
			database: { generateId: 'uuid' }
		},
		databaseHooks: {
			user: {
				create: {
					before: async (user) => {
						const email = user.email;
						const image = user.image ?? (await lookupGravatar(email));
						return {
							data: {
								...user,
								name: user.name || email.split('@')[0],
								image,
								initials: generateInitials({ email })
							}
						};
					}
				}
			}
		},
		plugins: [
			magicLink({
				expiresIn: 15 * 60,
				storeToken: 'hashed',
				sendMagicLink: async ({ email, url }) => {
					await sendMail({
						to: email,
						subject: t('api_mail_magic_link_subject'),
						text: `${t('api_mail_magic_link_text')}\n${url}`
					});
				}
			}),
			sveltekitCookies(getRequestEvent) // must stay the last plugin
		]
	});
}

export type Auth = ReturnType<typeof createAuth>;

let instance: Auth | undefined;

/** Created lazily so importing this module (build analysis, tests) needs no env or database. */
export function getAuth(): Auth {
	instance ??= createAuth();
	return instance;
}

export const auth: Auth = new Proxy({} as Auth, {
	get(_target, prop) {
		const real = getAuth();
		const value = Reflect.get(real, prop, real);
		return typeof value === 'function' ? value.bind(real) : value;
	}
});

export type SessionUser = Auth['$Infer']['Session']['user'];
export type Session = Auth['$Infer']['Session']['session'];
