<script lang="ts">
	import type { Snippet } from 'svelte';
	let { href, children }: { href: string; children: Snippet } = $props();
</script>

<a {href} class="text-sm/6 font-semibold text-second-900 dark:text-second-100">
	{@render children()}<span aria-hidden="true">&nbsp;→</span>
</a>
