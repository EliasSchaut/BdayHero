import { env } from '$env/dynamic/public';

/** Deploy with only the landing page visible (registration not open yet). */
export function isHeroOnly(): boolean {
	return ['1', 'true', 'yes', 'on'].includes((env.PUBLIC_HERO_ONLY ?? '').toLowerCase());
}

export function maxCompanionsPerGuest(): number {
	const n = Number(env.PUBLIC_MAX_COMPANIONS_PER_GUEST ?? 1);
	return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 1;
}
