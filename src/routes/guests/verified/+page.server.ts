import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { setFlash } from '$lib/server/flash';
import { t } from '$lib/server/i18n';

/** Landing page after a magic link was verified (or failed). Shows a flash and goes to /guests. */
export const load: PageServerLoad = ({ url, cookies, locals }) => {
	const error = url.searchParams.get('error');
	if (error || !locals.user) {
		setFlash(cookies, { code: 'DANGER', message: t('guests_signin_failed') });
	} else {
		setFlash(cookies, { code: 'SUCCESS', message: t('guests_verified') });
	}
	redirect(303, '/guests');
};
