import type { RequestHandler } from './$types';
import { isHeroOnly } from '$lib/config';

const SITE = 'https://bday.schaut.dev';

export const GET: RequestHandler = () => {
	const pages = isHeroOnly()
		? ['/', '/imprint', '/privacy']
		: ['/', '/details', '/guests', '/shifts', '/imprint', '/privacy'];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `\t<url><loc>${SITE}${p}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' }
	});
};
