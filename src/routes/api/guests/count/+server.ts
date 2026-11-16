import type { RequestHandler } from './$types';
import { handleApi, ok } from '#lib/server/api/respond.ts';
import { countGuests } from '#lib/server/services/guest.ts';

export const GET: RequestHandler = handleApi(async () => ok({ count: await countGuests() }));
