<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		id,
		label = '',
		icon: Icon,
		invalidPatternFeedback,
		class: className = '',
		value = $bindable(''),
		...rest
	}: HTMLInputAttributes & {
		id: string;
		label?: string;
		icon?: Component<{ class?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
		invalidPatternFeedback?: string;
		class?: string;
	} = $props();

	function validate(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		if (invalidPatternFeedback && input.validity.patternMismatch) {
			input.setCustomValidity(invalidPatternFeedback);
		} else input.setCustomValidity('');
	}
</script>

<div class={className}>
	{#if label}
		<label for={id} class="block text-sm leading-6 font-medium text-second-900 dark:text-white"
			>{label}</label
		>
	{/if}
	<div class="relative rounded-md shadow-sm">
		{#if Icon}
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<Icon class="size-5 text-second-400" aria-hidden="true" />
			</div>
		{/if}
		<input
			{id}
			name={id}
			bind:value
			oninput={validate}
			{...rest}
			class="block w-full rounded-md border-0 py-1.5 text-second-900 ring-1 ring-gray-300 ring-inset placeholder:text-second-400 focus:ring-2 focus:ring-prime-600 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-prime-500 {Icon
				? 'pl-10'
				: ''}"
		/>
	</div>
</div>
