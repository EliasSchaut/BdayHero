import type { RequestHandler } from './$types';
import { getLocale, isLocale } from '#lib/paraglide/runtime.js';
import { handleApi, ok } from '#lib/server/api/respond.ts';
import { listShifts } from '#lib/server/services/shift.ts';

/** Shifts localised by the request locale (cookie / Accept-Language) or `?lang=`. */
export const GET: RequestHandler = handleApi(async ({ locals, url }) => {
	const override = url.searchParams.get('lang');
	const lang = override && isLocale(override) ? override : getLocale();
	return ok(await listShifts(lang, locals.user?.id ?? null));
});
