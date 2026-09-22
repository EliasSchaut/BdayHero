<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let {
		id,
		label,
		children,
		value = $bindable(),
		...rest
	}: HTMLSelectAttributes & { id: string; label?: string; children: Snippet } = $props();
</script>

<div>
	{#if label}
		<label for={id} class="block text-sm/6 font-medium">{label}</label>
	{/if}
	<div class="grid grid-cols-1">
		<select
			{id}
			name={id}
			bind:value
			{...rest}
			class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-second-300 focus:outline-2 focus:-outline-offset-2 focus:outline-prime-600 sm:text-sm/6 dark:bg-second-700 dark:outline-second-600"
		>
			{@render children()}
		</select>
	</div>
</div>
