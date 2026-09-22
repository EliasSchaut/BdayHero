<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let {
		children,
		class: className = '',
		...rest
	}: HTMLButtonAttributes & { children: Snippet; class?: string } = $props();
</script>

<button
	{...rest}
	class="rounded-md bg-prime-600 px-3.5 py-1.5 text-sm leading-6 font-semibold text-white shadow-xs hover:bg-prime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prime-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-prime-600 {className}"
>
	{@render children()}
</button>
