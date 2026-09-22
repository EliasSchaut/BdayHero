import { APIError } from 'better-auth/api';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth';
import { ApiError } from '$lib/server/api/errors';
import { requireUser } from '$lib/server/api/guard';
import { handleApi, ok, readJson } from '$lib/server/api/respond';
import { t } from '$lib/server/i18n';
import { maxCompanionsPerGuest } from '$lib/config';
import { guestUpdateSchema } from '$lib/schemas/guest';
import { deleteProfile, getProfile, updateProfile } from '$lib/server/services/guest';

export const GET: RequestHandler = handleApi(async ({ locals }) => {
	const user = requireUser(locals);
	const profile = await getProfile(user.id);
	if (!profile) throw new ApiError('FORBIDDEN', 401, t('api_auth_required'));
	return ok(profile);
});

export const PATCH: RequestHandler = handleApi(async ({ locals, request }) => {
	const user = requireUser(locals);
	const max = maxCompanionsPerGuest();
	const parsed = guestUpdateSchema(max).safeParse(await readJson(request));
	if (!parsed.success) {
		const tooMany = parsed.error.issues.some(
			(i) => i.path[0] === 'companions' && i.code === 'too_big'
		);
		if (tooMany) throw new ApiError('WARNING', 400, t('api_guest_too_many_companions', { max }));
		throw parsed.error;
	}
	return ok(await updateProfile(user.id, parsed.data), { message: t('guests_profile_updated') });
});

export const DELETE: RequestHandler = handleApi(async ({ locals, request }) => {
	const user = requireUser(locals);
	try {
		await auth.api.signOut({ headers: request.headers });
	} catch (e) {
		if (!(e instanceof APIError)) throw e;
	}
	await deleteProfile(user.id);
	return ok({ deleted: true }, { code: 'INFO', message: t('guests_profile_deleted') });
});
