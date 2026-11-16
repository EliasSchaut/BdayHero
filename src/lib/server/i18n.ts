import { m } from '#lib/paraglide/messages.js';
import { getLocale, type Locale } from '#lib/paraglide/runtime.js';

export type MessageKey = keyof typeof m;

/**
 * Translate a message on the server for the locale of the current request
 * (resolved by the Paraglide middleware). Used for API responses and mails.
 */
export function t(key: MessageKey, params: Record<string, string | number> = {}, locale?: Locale) {
	const fn = m[key] as (p: Record<string, string | number>, o?: { locale?: Locale }) => string;
	return fn(params, { locale: locale ?? getLocale() });
}
