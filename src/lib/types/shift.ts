export interface SlotGuest {
	id: string;
	initials: string;
	name: string | null;
	image: string | null;
}

export interface SlotView {
	id: number;
	startAt: string;
	endAt: string;
	capacity: number;
	assigned: number;
	guests: SlotGuest[];
}

export interface ShiftView {
	id: number;
	name: string;
	description: string;
	slots: SlotView[];
}
