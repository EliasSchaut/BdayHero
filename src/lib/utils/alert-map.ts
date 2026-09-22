import type { ResCode } from '$lib/types/api';

export type AlertType = 'success' | 'info' | 'warn' | 'danger';

export function alertTypeFor(code: ResCode): AlertType {
	switch (code) {
		case 'SUCCESS':
			return 'success';
		case 'INFO':
			return 'info';
		case 'WARNING':
			return 'warn';
		default:
			return 'danger';
	}
}
