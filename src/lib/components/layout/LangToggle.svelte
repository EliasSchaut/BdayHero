<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import FlagDe from '$lib/components/icons/FlagDe.svelte';
	import FlagUk from '$lib/components/icons/FlagUk.svelte';

	let { class: className = '' }: { class?: string } = $props();
	const locale = getLocale();
</script>

<div class={className}>
	{#if locale === 'en'}
		<button
			type="button"
			onclick={() => setLocale('de')}
			title={m.common_lang_de()}
			aria-label={m.common_lang_de()}
		>
			<FlagDe class="size-6" />
		</button>
	{:else}
		<button
			type="button"
			onclick={() => setLocale('en')}
			title={m.common_lang_en()}
			aria-label={m.common_lang_en()}
		>
			<FlagUk class="size-6" />
		</button>
	{/if}
</div>
