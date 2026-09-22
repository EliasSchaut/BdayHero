import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { setFlash } from '$lib/server/flash';
import { t } from '$lib/server/i18n';
import { maxCompanionsPerGuest } from '$lib/config';
import { emailSchema, guestUpdateFromFormData, guestUpdateSchema } from '$lib/schemas/guest';
import {
	countGuests,
	deleteProfile,
	getProfile,
	listPublicGuests,
	updateProfile
} from '$lib/server/services/guest';
import type { ActionFeedback } from '$lib/types/api';

const PROVIDERS = ['github', 'google', 'discord'] as const;
type Provider = (typeof PROVIDERS)[number];

export const load: PageServerLoad = async ({ locals, url }) => {
	const [guests, count, profile] = await Promise.all([
		listPublicGuests(),
		countGuests(),
		locals.user ? getProfile(locals.user.id) : null
	]);
	const providers = PROVIDERS.filter((p) => auth.options.socialProviders?.[p]?.enabled);
	const oauthError = url.searchParams.get('error');
	return {
		guests,
		count,
		profile,
		providers,
		maxCompanions: maxCompanionsPerGuest(),
		oauthError: oauthError
			? ({ code: 'DANGER', message: t('guests_signin_failed') } satisfies ActionFeedback)
			: null
	};
};

const feedback = (code: ActionFeedback['code'], message: string) => ({
	feedback: { code, message }
});

export const actions: Actions = {
	magicLink: async ({ request }) => {
		const form = await request.formData();
		const parsed = emailSchema.safeParse({ email: form.get('email') });
		if (!parsed.success) return fail(400, feedback('WARNING', t('api_guest_invalid_input')));
		try {
			await auth.api.signInMagicLink({
				body: {
					email: parsed.data.email,
					callbackURL: '/guests/verified',
					errorCallbackURL: '/guests/verified'
				},
				headers: request.headers
			});
		} catch (e) {
			console.error('[auth] magic link failed', e);
			return fail(500, feedback('DANGER', t('guests_signin_failed')));
		}
		return feedback('SUCCESS', t('guests_signin_mail_sent'));
	},

	social: async ({ request }) => {
		const form = await request.formData();
		const provider = form.get('provider');
		if (
			typeof provider !== 'string' ||
			!PROVIDERS.includes(provider as Provider) ||
			!auth.options.socialProviders?.[provider as Provider]?.enabled
		) {
			return fail(400, feedback('WARNING', t('guests_signin_provider_disabled')));
		}
		let url: string | undefined;
		try {
			const result = await auth.api.signInSocial({
				body: {
					provider: provider as Provider,
					callbackURL: '/guests',
					errorCallbackURL: '/guests'
				},
				headers: request.headers
			});
			url = result.url;
		} catch (e) {
			console.error('[auth] social sign-in failed', e);
			return fail(500, feedback('DANGER', t('guests_signin_failed')));
		}
		if (!url) return fail(500, feedback('DANGER', t('guests_signin_failed')));
		redirect(303, url);
	},

	update: async ({ request, locals }) => {
		if (!locals.user) return fail(401, feedback('FORBIDDEN', t('api_auth_required')));
		const form = await request.formData();
		const max = maxCompanionsPerGuest();
		const parsed = guestUpdateSchema(max).safeParse(guestUpdateFromFormData(form));
		if (!parsed.success) {
			const tooMany = parsed.error.issues.some(
				(i) => i.path[0] === 'companions' && i.code === 'too_big'
			);
			return fail(
				400,
				feedback(
					'WARNING',
					tooMany ? t('api_guest_too_many_companions', { max }) : t('api_guest_invalid_input')
				)
			);
		}
		await updateProfile(locals.user.id, parsed.data);
		return feedback('SUCCESS', t('guests_profile_updated'));
	},

	delete: async ({ request, locals, cookies }) => {
		if (!locals.user) return fail(401, feedback('FORBIDDEN', t('api_auth_required')));
		try {
			await auth.api.signOut({ headers: request.headers });
		} catch (e) {
			if (!(e instanceof APIError)) throw e;
		}
		await deleteProfile(locals.user.id);
		setFlash(cookies, { code: 'INFO', message: t('guests_profile_deleted') });
		redirect(303, '/guests');
	},

	signOut: async ({ request }) => {
		try {
			await auth.api.signOut({ headers: request.headers });
		} catch (e) {
			if (!(e instanceof APIError)) throw e;
		}
		redirect(303, '/guests');
	}
};
