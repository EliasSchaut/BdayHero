export const AttendanceStatus = {
	NOT_RESPONDED: -1,
	NOT_ATTENDING: 0,
	ATTENDING: 1,
	MAYBE_ATTENDING: 2
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export interface CompanionView {
	name: string;
}

/** A guest as shown in public lists. Non-public profiles are anonymised. */
export interface PublicGuest {
	id: string;
	email: string;
	initials: string;
	firstName: string | null;
	lastName: string | null;
	image: string | null;
	bio: string | null;
	attendanceStatus: number;
	profilePublic: boolean;
	companions: CompanionView[];
}

/** The signed-in guest's own profile. */
export interface GuestProfile extends PublicGuest {
	needBed: boolean;
	hasBed: boolean;
	isVegan: boolean;
	assignedSlotIds: number[];
}
