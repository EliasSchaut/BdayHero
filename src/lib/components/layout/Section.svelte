<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Page section. `background` adds the dotted / grid pattern with a radial
	 * mask (the former Nuxt `dots` and `grid` layouts).
	 */
	let {
		id,
		background = 'none',
		children,
		class: className = ''
	}: {
		id?: string;
		background?: 'none' | 'dots' | 'grid';
		children: Snippet;
		class?: string;
	} = $props();
</script>

{#if background === 'none'}
	<section {id} class="py-24 sm:py-32 {className}">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">{@render children()}</div>
	</section>
{:else if background === 'grid'}
	<section
		{id}
		class="relative flex w-full items-center justify-center bg-white bg-[url('/svg/bg-grid-light.svg')] bg-repeat dark:bg-second-950 dark:bg-[url('/svg/bg-grid.svg')] {className}"
	>
		<div
			class="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-second-950"
		></div>
		<div class="z-10 flex w-11/12 flex-col items-center justify-center">{@render children()}</div>
	</section>
{:else}
	<section
		{id}
		class="relative w-full bg-white bg-[url('/svg/bg-dot-light.svg')] bg-repeat pb-24 dark:bg-second-950 dark:bg-[url('/svg/bg-dot.svg')] {className}"
	>
		<div
			class="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] dark:bg-second-950"
		></div>
		<div class="relative z-10">{@render children()}</div>
	</section>
{/if}
