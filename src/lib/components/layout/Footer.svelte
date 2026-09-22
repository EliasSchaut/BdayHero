<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Identification from '~icons/heroicons/identification';
	import Clipboard from '~icons/heroicons/clipboard-document-check';
	import GitHub from '$lib/components/icons/GitHub.svelte';
</script>

<footer class="z-10">
	<div
		class="mx-auto max-w-7xl space-y-4 px-6 py-12 md:flex md:items-center md:justify-between md:space-y-0 lg:px-8"
	>
		<p class="mt-8 text-center text-sm/6 text-second-400 md:order-1 md:mt-0 dark:text-second-500">
			&copy; 2022-2026 Elias Schaut. All rights reserved.
		</p>
		<div class="flex justify-center gap-x-6 md:order-2">
			<a
				href="/imprint"
				title={m.imprint_title()}
				class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400"
			>
				<span class="sr-only">{m.imprint_title()}</span>
				<Identification class="size-6" aria-hidden="true" />
			</a>
			<a
				href="/privacy"
				title={m.privacy_title()}
				class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400"
			>
				<span class="sr-only">{m.privacy_title()}</span>
				<Clipboard class="size-6" aria-hidden="true" />
			</a>
			<a
				href="https://github.com/EliasSchaut/BdayHero"
				target="_blank"
				rel="noopener"
				title="GitHub"
				class="text-second-400 hover:text-second-500 dark:text-second-500 dark:hover:text-second-400"
			>
				<span class="sr-only">GitHub</span>
				<GitHub class="size-6" />
			</a>
		</div>
	</div>
</footer>
