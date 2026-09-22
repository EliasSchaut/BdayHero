<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { applyTheme, THEME_COOKIE, type Theme } from '$lib/utils/theme';
	import Sun from '~icons/heroicons/sun';
	import Moon from '~icons/heroicons/moon';
	import Desktop from '~icons/heroicons/computer-desktop';

	let { theme = $bindable('system'), class: className = '' }: { theme?: Theme; class?: string } =
		$props();

	const next: Record<Theme, Theme> = { light: 'dark', dark: 'system', system: 'light' };
	const labels = $derived({
		light: m.common_theme_light(),
		dark: m.common_theme_dark(),
		system: m.common_theme_system()
	});

	function cycle() {
		theme = next[theme];
		applyTheme(theme);
		document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
	}
</script>

<button
	type="button"
	onclick={cycle}
	title={labels[theme]}
	aria-label={labels[theme]}
	class="flex items-center text-second-600 hover:text-second-500 dark:text-second-400 {className}"
>
	{#if theme === 'light'}
		<Sun class="size-6" aria-hidden="true" />
	{:else if theme === 'dark'}
		<Moon class="size-6" aria-hidden="true" />
	{:else}
		<Desktop class="size-6" aria-hidden="true" />
	{/if}
</button>
