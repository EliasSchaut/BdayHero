<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<div class="isolate flex -space-x-2 overflow-hidden {className}">{@render children()}</div>
