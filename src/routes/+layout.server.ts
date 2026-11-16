import type { LayoutServerLoad } from './$types';
import { isHeroOnly } from '#lib/config.ts';
import { takeFlash } from '#lib/server/flash.ts';
import { isTheme, THEME_COOKIE, type Theme } from '#lib/utils/theme.ts';

export const load: LayoutServerLoad = ({ locals, cookies }) => {
	const cookie = cookies.get(THEME_COOKIE);
	const theme: Theme = isTheme(cookie) ? cookie : 'system';
	return {
		user: locals.user,
		heroOnly: isHeroOnly(),
		theme,
		flash: takeFlash(cookies)
	};
};
