<script lang="ts">
	import type { Snippet } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import ButtonPrime from '$lib/components/ui/ButtonPrime.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import CheckCircle from '~icons/heroicons/check-circle-solid';
	import XCircle from '~icons/heroicons/x-circle-solid';

	export type SubmitState = 'idle' | 'loading' | 'success' | 'failure';

	let { state = 'idle', children }: { state?: SubmitState; children: Snippet } = $props();
</script>

<div>
	<ButtonPrime
		type="submit"
		disabled={state === 'loading'}
		class="flex w-full justify-center transition duration-200 ease-in-out {state === 'success'
			? 'bg-green-500! hover:bg-green-600! focus-visible:outline-green-400! dark:bg-green-600!'
			: state === 'failure'
				? 'bg-red-500! hover:bg-red-600! focus-visible:outline-red-400! dark:bg-red-600!'
				: state === 'loading'
					? 'bg-gray-500! opacity-50 hover:cursor-progress!'
					: ''}"
	>
		{#if state === 'loading'}
			<Spinner />
		{:else if state === 'success'}
			<CheckCircle class="size-6" />
		{:else if state === 'failure'}
			<XCircle class="size-6" />
		{:else}
			{@render children()}
		{/if}
	</ButtonPrime>
	<span class="mt-1 flex justify-center gap-x-1 text-center text-xs font-light">
		<span>{m.common_form_privacy_pre()}</span>
		<a href="/privacy" class="text-prime-500 underline">{m.common_form_privacy_post()}</a>
	</span>
</div>
