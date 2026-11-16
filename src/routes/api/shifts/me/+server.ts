import type { RequestHandler } from './$types';
import { requireUser } from '#lib/server/api/guard.ts';
import { handleApi, ok } from '#lib/server/api/respond.ts';
import { mySlotIds } from '#lib/server/services/shift.ts';

export const GET: RequestHandler = handleApi(async ({ locals }) => {
	const user = requireUser(locals);
	return ok({ slotIds: await mySlotIds(user.id) });
});
