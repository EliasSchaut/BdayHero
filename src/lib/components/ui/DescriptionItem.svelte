<script lang="ts">
	import type { Snippet } from 'svelte';
	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
	<dt class="text-sm font-medium text-second-900 dark:text-white">{title}</dt>
	<dd class="mt-1 text-sm leading-6 text-second-700 sm:col-span-2 sm:mt-0 dark:text-second-200">
		{@render children()}
	</dd>
</div>
