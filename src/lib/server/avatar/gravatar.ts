import { createHash } from 'node:crypto';

const GRAVATAR_BASE = 'https://www.gravatar.com/avatar/';
const LOOKUP_TIMEOUT_MS = 3000;

export function gravatarHash(email: string): string {
	return createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

export function gravatarUrl(email: string): string {
	return `${GRAVATAR_BASE}${gravatarHash(email)}`;
}

/**
 * Returns the Gravatar URL if the address has one, otherwise `null`.
 * Network problems or slow responses are treated as "no avatar".
 */
export async function lookupGravatar(
	email: string,
	fetchFn: typeof fetch = fetch
): Promise<string | null> {
	const url = gravatarUrl(email);
	try {
		const res = await fetchFn(`${url}?d=404`, {
			method: 'HEAD',
			signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS)
		});
		return res.ok ? url : null;
	} catch {
		return null;
	}
}
