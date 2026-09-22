<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';
	import Envelope from '~icons/heroicons/envelope-20-solid';

	let {
		id,
		label = '',
		class: className = '',
		...rest
	}: HTMLInputAttributes & { id: string; label?: string; class?: string } = $props();
</script>

<Input
	{id}
	type="email"
	autocomplete="email"
	{label}
	icon={Envelope}
	placeholder="you@example.com"
	class={className}
	{...rest}
/>
