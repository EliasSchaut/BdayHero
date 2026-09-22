<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import Accent from '$lib/components/ui/Accent.svelte';
	import LangToggle from './LangToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import Bars3 from '~icons/heroicons/bars-3';
	import XMark from '~icons/heroicons/x-mark';
	import type { Theme } from '$lib/utils/theme';

	let { heroOnly = false, theme = $bindable('system') }: { heroOnly?: boolean; theme?: Theme } =
		$props();

	let open = $state(false);

	const links = $derived(
		heroOnly
			? [{ name: m.nav_home(), href: '/' }]
			: [
					{ name: m.nav_home(), href: '/' },
					{ name: m.nav_details(), href: '/details' },
					{ name: m.nav_guests(), href: '/guests' },
					{ name: m.nav_shifts(), href: '/shifts' }
				]
	);
	const isActive = (href: string) => page.url.pathname.split('/')[1] === href.split('/')[1];
</script>

<header class="relative z-20">
	<Collapsible.Root bind:open>
		<nav class="flex w-full items-center justify-between gap-x-12 p-6" aria-label="Main">
			<div class="flex gap-x-12">
				<a class="text-2xl font-bold" href="/"><span>Kids</span><Accent>Bday</Accent></a>
				<div
					class="text-md flex items-center space-x-12 font-medium text-second-700 dark:text-second-300"
				>
					{#each links as link (link.href)}
						<a
							href={link.href}
							aria-current={isActive(link.href) ? 'page' : undefined}
							class="hidden rounded-md px-2 py-1 hover:bg-prime-50 md:inline dark:hover:bg-prime-950"
						>
							{link.name}
						</a>
					{/each}
				</div>
			</div>
			<div class="flex gap-x-6">
				<LangToggle class="hidden md:block" />
				<ThemeToggle bind:theme class="hidden md:block" />
				<div class="-mr-2 flex items-center md:hidden">
					<Collapsible.Trigger
						class="mr-2.5 -ml-2.5 inline-flex items-center justify-center rounded-md p-2 text-second-600 hover:bg-second-100 hover:text-second-900 focus:ring-2 focus:ring-prime-500 focus:outline-none focus:ring-inset dark:hover:bg-second-700 dark:hover:text-white dark:focus:ring-white"
					>
						<span class="sr-only">{m.common_sr_open_main_menu()}</span>
						{#if open}
							<XMark class="block size-6" aria-hidden="true" />
						{:else}
							<Bars3 class="block size-6" aria-hidden="true" />
						{/if}
					</Collapsible.Trigger>
				</div>
			</div>
		</nav>

		<Collapsible.Content class="shadow-sm md:hidden">
			<div class="space-y-1 pt-2 pb-3">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (open = false)}
						class="block border-l-4 py-2 pr-4 pl-3 text-base font-medium {isActive(link.href)
							? 'border-prime-500 bg-prime-50 text-prime-700 dark:bg-second-900 dark:text-white'
							: 'border-transparent text-second-500 hover:border-second-300 hover:bg-second-50 hover:text-second-700 dark:text-second-300 dark:hover:bg-second-700 dark:hover:text-white'}"
					>
						{link.name}
					</a>
				{/each}
			</div>
			<div
				class="flex justify-end gap-x-4 border-t border-second-200 px-4 pt-4 pb-3 dark:border-second-700"
			>
				<LangToggle />
				<ThemeToggle bind:theme />
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
</header>
