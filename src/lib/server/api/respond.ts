import type { RequestEvent } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { ApiErr, ApiOk } from '#lib/types/api.ts';
import { ApiError } from './errors';
import { t } from '#lib/server/i18n.ts';

export function ok<T>(
	data: T,
	init?: { code?: ApiOk<T>['code']; message?: string; status?: number }
) {
	const body: ApiOk<T> = { ok: true, code: init?.code ?? 'SUCCESS', message: init?.message, data };
	return Response.json(body, { status: init?.status ?? 200 });
}

export function err(error: ApiError) {
	return Response.json(error.toJSON() satisfies ApiErr, { status: error.status });
}

/**
 * Wrap a request handler so thrown `ApiError`s, zod validation errors and
 * unexpected exceptions all become the API's JSON error envelope.
 */
export function handleApi<E extends RequestEvent>(fn: (event: E) => Promise<Response> | Response) {
	return async (event: E): Promise<Response> => {
		try {
			return await fn(event);
		} catch (e) {
			if (e instanceof ApiError) return err(e);
			if (e instanceof ZodError) {
				return err(
					new ApiError(
						'WARNING',
						400,
						t('api_guest_invalid_input'),
						e.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
					)
				);
			}
			console.error('[api]', e);
			return err(new ApiError('DANGER', 500, t('api_internal')));
		}
	};
}

/** Parse a JSON body, tolerating an empty body. */
export async function readJson(request: Request): Promise<unknown> {
	const text = await request.text();
	if (!text.trim()) return {};
	try {
		return JSON.parse(text);
	} catch {
		throw new ApiError('WARNING', 400, t('api_guest_invalid_input'));
	}
}
