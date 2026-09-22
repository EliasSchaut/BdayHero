/** Output of `import x from './img.jpg?enhanced'` (vite-imagetools Picture). */
export interface Picture {
	sources: Record<string, string>;
	img: { src: string; w: number; h: number };
}
