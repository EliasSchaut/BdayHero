<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
	<div class="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
		{@render children()}
	</div>
</div>
