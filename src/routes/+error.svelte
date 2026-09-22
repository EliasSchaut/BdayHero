<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import ButtonPrime from '$lib/components/ui/ButtonPrime.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? m.not_found_title() : m.error_title()} · Kids Bday 2027</title>
</svelte:head>

<section class="px-6 py-24 text-center sm:py-32">
	<p class="text-base font-semibold text-prime-600 dark:text-prime-400">{page.status}</p>
	<h1
		class="mt-4 text-4xl font-semibold tracking-tight text-second-900 sm:text-5xl dark:text-white"
	>
		{page.status === 404 ? m.not_found_title() : m.error_title()}
	</h1>
	<p class="mt-6 text-lg text-second-600 dark:text-second-300">
		{page.status === 404 ? m.not_found_body() : page.error?.message}
	</p>
	<div class="mt-10 flex justify-center">
		<a href="/"><ButtonPrime type="button">{m.common_back_home()}</ButtonPrime></a>
	</div>
</section>
