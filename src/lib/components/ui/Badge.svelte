<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		children,
		class: className = '',
		title
	}: { children: Snippet; class?: string; title?: string } = $props();
</script>

<span
	{title}
	class="inline-flex items-center rounded-full bg-second-50 px-1.5 py-0.5 text-xs font-medium text-second-800 ring-1 ring-second-600/20 ring-inset sm:px-2 sm:py-1 dark:bg-second-900 dark:text-second-400 dark:ring-second-700 {className}"
>
	{@render children()}
</span>
