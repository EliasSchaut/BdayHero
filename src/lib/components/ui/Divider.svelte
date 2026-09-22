<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, class: className = '' }: { children?: Snippet; class?: string } = $props();
</script>

<div class="relative {className}">
	<div class="absolute inset-0 flex items-center" aria-hidden="true">
		<div class="w-full border-t border-second-300 dark:border-second-600"></div>
	</div>
	{@render children?.()}
</div>
