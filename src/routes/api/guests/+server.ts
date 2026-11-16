import type { RequestHandler } from './$types';
import { handleApi, ok } from '#lib/server/api/respond.ts';
import { countGuests, listPublicGuests } from '#lib/server/services/guest.ts';

/** Public, anonymised guest list plus headcount. */
export const GET: RequestHandler = handleApi(async () => {
	const [guests, count] = await Promise.all([listPublicGuests(), countGuests()]);
	return ok({ guests, count });
});
