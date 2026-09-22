import type { Picture } from '$lib/types/image';

/** All feature images, optimised by @sveltejs/enhanced-img, keyed by file name. */
const modules = import.meta.glob<Picture>('./*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true }
});

export const featureImages: Record<string, Picture> = Object.fromEntries(
	Object.entries(modules).map(([path, picture]) => [path.replace(/^\.\/|\.jpg$/g, ''), picture])
);

export function featureImage(name: string): Picture {
	const picture = featureImages[name];
	if (!picture) throw new Error(`Unknown feature image: ${name}`);
	return picture;
}
