/** Paths hidden while `PUBLIC_HERO_ONLY` is set. Imprint, privacy and health stay reachable. */
const BLOCKED_PAGES = ['/guests', '/shifts', '/details'];
const BLOCKED_API = ['/api/guests', '/api/shifts', '/api/auth'];

const matches = (pathname: string, prefixes: string[]) =>
	prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export function isBlockedPage(pathname: string): boolean {
	return matches(pathname, BLOCKED_PAGES);
}

export function isBlockedApi(pathname: string): boolean {
	return matches(pathname, BLOCKED_API);
}
