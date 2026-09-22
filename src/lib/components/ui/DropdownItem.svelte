<script lang="ts">
	import type { Snippet } from 'svelte';
	import { DropdownMenu } from 'bits-ui';

	let {
		children,
		href,
		target,
		onSelect
	}: { children: Snippet; href?: string; target?: string; onSelect?: () => void } = $props();

	const classes =
		'text-second-700 hover:bg-second-100 data-highlighted:bg-second-100 dark:text-second-300 dark:hover:bg-second-900 dark:data-highlighted:bg-second-900 flex w-full cursor-pointer items-center gap-x-3 px-4 py-2 text-sm outline-none';
</script>

{#if href}
	<DropdownMenu.Item class={classes} onSelect={() => window.open(href, target ?? '_self')}>
		{@render children()}
	</DropdownMenu.Item>
{:else}
	<DropdownMenu.Item class={classes} {onSelect}>
		{@render children()}
	</DropdownMenu.Item>
{/if}
