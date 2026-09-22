import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';
import { ApiError } from '$lib/server/api/errors';
import { t } from '$lib/server/i18n';
import { assignSlot, listShifts, mySlotIds, unassignSlot } from '$lib/server/services/shift';
import type { ActionFeedback } from '$lib/types/api';

export const load: PageServerLoad = async ({ locals }) => {
	const [shifts, assigned] = await Promise.all([
		listShifts(getLocale(), locals.user?.id ?? null),
		locals.user ? mySlotIds(locals.user.id) : ([] as number[])
	]);
	return { shifts, assigned };
};

const slotIdSchema = z.coerce.number().int().positive();
const feedback = (code: ActionFeedback['code'], message: string) => ({
	feedback: { code, message }
});

async function run(
	locals: App.Locals,
	request: Request,
	fn: (userId: string, slotId: number) => Promise<void>,
	successKey: 'api_shift_slot_assigned' | 'api_shift_slot_unassigned'
) {
	if (!locals.user) return fail(401, feedback('FORBIDDEN', t('api_auth_required')));
	const form = await request.formData();
	const parsed = slotIdSchema.safeParse(form.get('slotId'));
	if (!parsed.success) return fail(400, feedback('WARNING', t('api_guest_invalid_input')));
	try {
		await fn(locals.user.id, parsed.data);
	} catch (e) {
		if (e instanceof ApiError) return fail(e.status, feedback(e.code, e.message));
		throw e;
	}
	return feedback('SUCCESS', t(successKey));
}

export const actions: Actions = {
	assign: ({ locals, request }) => run(locals, request, assignSlot, 'api_shift_slot_assigned'),
	unassign: ({ locals, request }) => run(locals, request, unassignSlot, 'api_shift_slot_unassigned')
};
