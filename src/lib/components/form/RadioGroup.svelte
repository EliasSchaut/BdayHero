<script lang="ts">
	import type { Snippet } from 'svelte';
	import { RadioGroup } from 'bits-ui';

	let {
		name,
		value = $bindable(''),
		children
	}: { name: string; value?: string; children: Snippet } = $props();
</script>

<RadioGroup.Root
	{name}
	bind:value
	orientation="horizontal"
	class="mt-2 flex justify-center gap-x-3 rounded-2xl bg-second-100 p-2 dark:bg-second-800"
>
	{@render children()}
</RadioGroup.Root>
