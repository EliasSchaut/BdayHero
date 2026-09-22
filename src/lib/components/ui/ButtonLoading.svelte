<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from './Spinner.svelte';
	let {
		children,
		loading = false,
		class: className = '',
		...rest
	}: HTMLButtonAttributes & { children: Snippet; loading?: boolean; class?: string } = $props();
</script>

<button {...rest} disabled={loading || rest.disabled} class={className}>
	{#if loading}
		<Spinner class="size-6" />
	{:else}
		{@render children()}
	{/if}
</button>
