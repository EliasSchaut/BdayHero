export type Theme = 'light' | 'dark' | 'system';
export const THEME_COOKIE = 'theme';
export const THEMES: Theme[] = ['light', 'dark', 'system'];

export function isTheme(value: unknown): value is Theme {
	return typeof value === 'string' && (THEMES as string[]).includes(value);
}

/** Applies a theme to <html> on the client without a reload. */
export function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.remove('dark', 'system');
	if (theme === 'system') {
		root.classList.add('system');
		if (matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
	} else if (theme === 'dark') {
		root.classList.add('dark');
	}
}
