<script lang="ts">
	import { untrack, type Snippet } from 'svelte';

	/**
	 * Stacked "deck of cards" tabs: the active panel sits on top, the others
	 * peek out behind it and fan out while a tab button is hovered.
	 */
	let {
		tabs,
		panel
	}: { tabs: { id: string; title: string }[]; panel: Snippet<[{ id: string; title: string }]> } =
		$props();

	let order = $state(untrack(() => tabs.map((t) => t.id)));
	let hovering = $state(false);
	const active = $derived(order[0]);

	function select(id: string) {
		order = [id, ...order.filter((o) => o !== id)];
	}
</script>

<div
	class="mx-4 my-6 flex h-[110rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] sm:mx-10 md:h-[60rem]"
>
	<div
		role="tablist"
		class="flex w-full max-w-full flex-row items-center justify-center overflow-visible [perspective:1000px]"
	>
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				aria-selected={active === tab.id}
				onclick={() => select(tab.id)}
				onpointerenter={() => (hovering = true)}
				onpointerleave={() => (hovering = false)}
				class="relative hidden rounded-full px-6 py-2 sm:block"
			>
				{#if active === tab.id}
					<span
						class="absolute inset-0 rounded-full bg-gray-200 transition duration-200 dark:bg-zinc-800"
					></span>
				{/if}
				<span class="relative block text-black dark:text-white">{tab.title}</span>
			</button>
		{/each}
		<select
			aria-label="Tab"
			value={active}
			onchange={(e) => select(e.currentTarget.value)}
			class="w-full rounded-md border-none bg-gray-800 py-2 pl-3 text-white opacity-90 shadow-sm ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:hidden sm:text-sm"
		>
			{#each tabs as tab (tab.id)}
				<option value={tab.id}>{tab.title}</option>
			{/each}
		</select>
	</div>

	<div class="relative mt-16 h-full w-full">
		{#each tabs as tab (tab.id)}
			{@const idx = order.indexOf(tab.id)}
			<div
				role="tabpanel"
				aria-hidden={idx !== 0}
				class="absolute left-0 h-[40rem] w-full transition-all duration-300 ease-in-out motion-reduce:transition-none"
				style:scale={1 - idx * 0.1}
				style:top="{idx * (hovering ? -45 : -22.5)}px"
				style:z-index={-idx}
				style:opacity={idx === 0 ? 1 : hovering ? 1 - idx * 0.1 : 0}
			>
				<div
					class="flex flex-col flex-wrap place-content-center gap-2 place-self-stretch rounded-2xl bg-linear-to-br from-purple-700 to-violet-900 py-5 text-xl font-bold text-white md:flex-row md:text-4xl"
				>
					{@render panel(tab)}
				</div>
			</div>
		{/each}
	</div>
</div>
