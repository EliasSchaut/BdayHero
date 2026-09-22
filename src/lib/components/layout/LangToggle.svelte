<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import FlagDe from '$lib/components/icons/FlagDe.svelte';
	import FlagUk from '$lib/components/icons/FlagUk.svelte';

	let { class: className = '' }: { class?: string } = $props();
	const locale = getLocale();
	const next = locale === 'en' ? 'de' : 'en';
	const label = locale === 'en' ? m.common_lang_de() : m.common_lang_en();
</script>

<button
	type="button"
	onclick={() => setLocale(next)}
	title={label}
	aria-label={label}
	class="flex items-center {className}"
>
	{#if locale === 'en'}
		<FlagDe class="size-6" />
	{:else}
		<FlagUk class="size-6" />
	{/if}
</button>
