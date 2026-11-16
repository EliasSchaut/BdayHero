import { PUBLIC_HERO_ONLY, PUBLIC_MAX_COMPANIONS_PER_GUEST } from '$app/env/public';

/** Deploy with only the landing page visible (registration not open yet). */
export function isHeroOnly(): boolean {
	return ['1', 'true', 'yes', 'on'].includes((PUBLIC_HERO_ONLY ?? '').toLowerCase());
}

export function maxCompanionsPerGuest(): number {
	const n = Number(PUBLIC_MAX_COMPANIONS_PER_GUEST ?? 1);
	return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 1;
}
