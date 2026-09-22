import type { RequestHandler } from './$types';
import { requireUser } from '$lib/server/api/guard';
import { handleApi, ok } from '$lib/server/api/respond';
import { mySlotIds } from '$lib/server/services/shift';

export const GET: RequestHandler = handleApi(async ({ locals }) => {
	const user = requireUser(locals);
	return ok({ slotIds: await mySlotIds(user.id) });
});
