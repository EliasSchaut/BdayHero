<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	type Provider = 'google' | 'github' | 'discord';
	let { provider, disabled = false }: { provider: Provider; disabled?: boolean } = $props();

	const labels: Record<Provider, () => string> = {
		google: m.common_signin_google,
		github: m.common_signin_github,
		discord: m.common_signin_discord
	};
</script>

<button
	type="submit"
	name="provider"
	value={provider}
	{disabled}
	class="rounded-md border border-solid border-second-400 bg-white py-1.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-second-800 dark:bg-second-950"
>
	<div class="flex justify-center gap-x-5">
		<img class="w-6" src="/svg/{provider}.svg" alt="" width="24" height="24" />
		<span>{labels[provider]()}</span>
	</div>
</button>
