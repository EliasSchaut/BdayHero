/**
 * Initials shown in the avatar fallback: first letters of first and last name,
 * otherwise the first character of the e-mail address.
 */
export function generateInitials(guest: {
	firstName?: string | null;
	lastName?: string | null;
	email: string;
}): string {
	if (guest.firstName && guest.lastName) {
		return (guest.firstName.charAt(0) + guest.lastName.charAt(0)).toUpperCase();
	}
	return guest.email.charAt(0).toUpperCase();
}
