<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<h2
	class="pointer-events-none bg-linear-to-b from-second-400 to-second-900 bg-clip-text px-8 py-1 text-center text-4xl font-bold text-transparent sm:tracking-tight dark:from-zinc-200 dark:to-zinc-500"
>
	{@render children()}
</h2>
