import type { RequestHandler } from './$types';
import { handleApi, ok } from '$lib/server/api/respond';
import { countGuests } from '$lib/server/services/guest';

export const GET: RequestHandler = handleApi(async () => ok({ count: await countGuests() }));
