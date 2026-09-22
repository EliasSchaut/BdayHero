import { ApiError } from './errors';
import { t } from '$lib/server/i18n';
import type { SessionUser } from '$lib/server/auth';

export function requireUser(locals: App.Locals): SessionUser {
	if (!locals.user) throw new ApiError('FORBIDDEN', 401, t('api_auth_required'));
	return locals.user;
}
