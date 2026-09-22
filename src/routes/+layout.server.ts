import type { LayoutServerLoad } from './$types';
import { isHeroOnly } from '$lib/config';
import { isTheme, THEME_COOKIE, type Theme } from '$lib/utils/theme';

export const load: LayoutServerLoad = ({ locals, cookies }) => {
	const cookie = cookies.get(THEME_COOKIE);
	const theme: Theme = isTheme(cookie) ? cookie : 'system';
	return {
		user: locals.user,
		heroOnly: isHeroOnly(),
		theme
	};
};
