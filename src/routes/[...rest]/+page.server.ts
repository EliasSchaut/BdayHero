import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/** Catch-all: unknown URLs are a real 404 instead of silently rendering the landing page. */
export const load: PageServerLoad = () => {
	error(404);
};
