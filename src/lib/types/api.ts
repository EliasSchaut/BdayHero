export type ResCode = 'SUCCESS' | 'INFO' | 'WARNING' | 'DANGER' | 'FORBIDDEN';

export interface ApiOk<T> {
	ok: true;
	code: 'SUCCESS' | 'INFO';
	message?: string;
	data: T;
}

export interface ApiErr {
	ok: false;
	code: 'WARNING' | 'DANGER' | 'FORBIDDEN';
	message: string;
	issues?: { path: string; message: string }[];
}

export type ApiResponse<T> = ApiOk<T> | ApiErr;

/** Shape returned by form actions so pages can show an alert. */
export interface ActionFeedback {
	code: ResCode;
	message: string;
}
