<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<h3
	class="mx-auto max-w-2xl text-center text-base/7 font-semibold text-prime-600 dark:text-prime-500 {className}"
>
	{@render children()}
</h3>
