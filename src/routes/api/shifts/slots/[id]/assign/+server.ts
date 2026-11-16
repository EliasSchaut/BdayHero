import { z } from 'zod';
import type { RequestHandler } from './$types';
import { requireUser } from '#lib/server/api/guard.ts';
import { handleApi, ok } from '#lib/server/api/respond.ts';
import { t } from '#lib/server/i18n.ts';
import { assignSlot, unassignSlot } from '#lib/server/services/shift.ts';

const idSchema = z.coerce.number().int().positive();

export const POST: RequestHandler = handleApi(async ({ locals, params }) => {
	const user = requireUser(locals);
	const slotId = idSchema.parse(params.id);
	await assignSlot(user.id, slotId);
	return ok({ slotId, assigned: true }, { message: t('api_shift_slot_assigned') });
});

export const DELETE: RequestHandler = handleApi(async ({ locals, params }) => {
	const user = requireUser(locals);
	const slotId = idSchema.parse(params.id);
	await unassignSlot(user.id, slotId);
	return ok({ slotId, assigned: false }, { message: t('api_shift_slot_unassigned') });
});
