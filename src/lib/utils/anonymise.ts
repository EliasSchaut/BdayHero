import type { PublicGuest } from '$lib/types/guest';

export const ANONYMOUS_EMAIL = 'Anonym';
export const ANONYMOUS_INITIALS = '?';

/**
 * Hide everything but id, attendance and the public flag for guests who did
 * not opt into being listed publicly.
 */
export function anonymiseIfNotPublic<T extends PublicGuest>(guest: T): PublicGuest {
	if (guest.profilePublic) return guest;
	return {
		id: guest.id,
		email: ANONYMOUS_EMAIL,
		initials: ANONYMOUS_INITIALS,
		firstName: null,
		lastName: null,
		image: null,
		bio: null,
		attendanceStatus: guest.attendanceStatus,
		profilePublic: false,
		companions: []
	};
}
