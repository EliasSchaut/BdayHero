<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	let {
		title,
		icon: Icon,
		children,
		class: className = ''
	}: {
		title: string;
		icon: Component<{ class?: string }>;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class="overflow-hidden rounded-xl border border-second-200 bg-white dark:border-second-700 dark:bg-second-900 dark:text-second-100 {className}"
>
	<div
		class="flex items-center gap-x-4 border-b border-second-900/5 bg-second-50 p-6 dark:bg-second-800"
	>
		<div
			class="flex size-12 items-center justify-center rounded-lg bg-white ring-1 ring-second-900/10 dark:bg-second-900 dark:ring-second-700"
		>
			<Icon class="size-8" />
		</div>
		<h1 class="text-lg leading-6 font-medium text-second-900 dark:text-second-200">{title}</h1>
	</div>
	<div class="px-6 py-4 text-sm leading-6 break-words text-second-500 dark:text-second-400">
		{@render children()}
	</div>
</div>
