import { ApiError } from './errors';
import { t } from '#lib/server/i18n.ts';
import type { SessionUser } from '#lib/server/auth/index.ts';

export function requireUser(locals: App.Locals): SessionUser {
	if (!locals.user) throw new ApiError('FORBIDDEN', 401, t('api_auth_required'));
	return locals.user;
}
