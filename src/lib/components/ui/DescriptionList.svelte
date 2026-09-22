<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		title,
		subtitle = '',
		children
	}: { title: string; subtitle?: string; children: Snippet } = $props();
</script>

<div class="overflow-hidden">
	<div class="px-4 py-6 sm:px-6">
		<h1 class="text-base leading-7 font-semibold text-second-900 dark:text-white">{title}</h1>
		{#if subtitle}
			<p class="mt-1 max-w-2xl text-sm leading-6 text-second-500 dark:text-second-300">
				{subtitle}
			</p>
		{/if}
	</div>
	<div class="border-t border-second-100 dark:border-second-800">
		<dl class="divide-y divide-second-100 dark:divide-second-800">{@render children()}</dl>
	</div>
</div>
