import type { ApiErr } from '$lib/types/api';

/** Error carrying an alert code and HTTP status; rendered by form actions and /api handlers. */
export class ApiError extends Error {
	constructor(
		public readonly code: ApiErr['code'],
		public readonly status: number,
		message: string,
		public readonly issues?: ApiErr['issues']
	) {
		super(message);
		this.name = 'ApiError';
	}

	toJSON(): ApiErr {
		return { ok: false, code: this.code, message: this.message, issues: this.issues };
	}
}
