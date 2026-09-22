<script lang="ts">
	import type { Snippet } from 'svelte';
	import Divider from './Divider.svelte';
	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<Divider class={className}>
	<div class="relative flex justify-center">
		<span class="bg-second-100 px-2 text-sm text-second-500 dark:bg-second-800">
			{@render children()}
		</span>
	</div>
</Divider>
