import { redirect } from '@sveltejs/kit';
import { sequence, type Handle } from '@sveltejs/kit/hooks';
import { building } from '$app/env';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '#lib/server/auth/index.ts';
import { paraglideMiddleware } from '#lib/paraglide/server.js';
import { isHeroOnly } from '#lib/config.ts';
import { isBlockedApi, isBlockedPage } from '#lib/hero-only.ts';
import { t } from '#lib/server/i18n.ts';
import { THEME_COOKIE } from '#lib/utils/theme.ts';

/** Resolve the locale from cookie / Accept-Language and expose it to the rest of the request. */
const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		const theme = event.cookies.get(THEME_COOKIE);
		return resolve(
			{ ...event, request },
			{
				transformPageChunk: ({ html }) =>
					html
						.replace('%paraglide.lang%', locale)
						.replace('%app.theme%', theme === 'dark' ? 'dark' : theme === 'light' ? '' : 'system')
			}
		);
	});

/** `PUBLIC_HERO_ONLY=true`: only the landing page, imprint and privacy are served. */
const handleHeroOnly: Handle = async ({ event, resolve }) => {
	if (isHeroOnly()) {
		const { pathname } = event.url;
		if (isBlockedPage(pathname)) redirect(307, '/');
		if (isBlockedApi(pathname)) {
			return Response.json(
				{ ok: false, code: 'FORBIDDEN', message: t('api_hero_only') },
				{ status: 404 }
			);
		}
	}
	return resolve(event);
};

/** Load the session into `locals` and let Better Auth serve /api/auth/*. */
const handleAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;
	return svelteKitHandler({ event, resolve, auth, building });
};

/** Security headers. Static assets under /_app/immutable already get long cache lifetimes. */
const handleHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set('X-Frame-Options', 'DENY');
	if (!response.headers.has('Cache-Control') && event.url.pathname.startsWith('/api/')) {
		response.headers.set('Cache-Control', 'no-store');
	}
	return response;
};

export const handle: Handle = sequence(handleParaglide, handleHeroOnly, handleAuth, handleHeaders);
