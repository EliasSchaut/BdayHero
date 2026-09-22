import type { Cookies } from '@sveltejs/kit';
import type { ActionFeedback } from '$lib/types/api';

const FLASH_COOKIE = 'flash';

/** One-shot alert shown on the next page render (used across redirects). */
export function setFlash(cookies: Cookies, feedback: ActionFeedback) {
	cookies.set(FLASH_COOKIE, JSON.stringify(feedback), {
		path: '/',
		maxAge: 60,
		httpOnly: true,
		sameSite: 'lax'
	});
}

export function takeFlash(cookies: Cookies): ActionFeedback | null {
	const raw = cookies.get(FLASH_COOKIE);
	if (!raw) return null;
	cookies.delete(FLASH_COOKIE, { path: '/' });
	try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed.message === 'string' && typeof parsed.code === 'string')
			return parsed;
	} catch {
		/* ignore malformed cookie */
	}
	return null;
}
