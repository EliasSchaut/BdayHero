<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import UserCircle from '~icons/heroicons/user-circle-solid';

	let {
		cite,
		name,
		handle,
		avatar
	}: { cite: string; name?: string; handle?: string; avatar?: string } = $props();
</script>

<figure class="rounded-2xl bg-second-50 p-8 text-sm/6 dark:bg-second-900">
	<blockquote class="text-second-900 dark:text-white"><p>“{cite}”</p></blockquote>
	<figcaption class="mt-6 flex items-center gap-x-4">
		{#if avatar}
			<img
				class="size-10 rounded-full bg-second-50"
				src={avatar}
				alt={name ?? ''}
				width="40"
				height="40"
				loading="lazy"
			/>
		{:else}
			<UserCircle
				class="size-10 rounded-full text-gray-300 dark:text-gray-500"
				aria-hidden="true"
			/>
		{/if}
		<div>
			<div class="font-semibold text-second-900 dark:text-white">
				{name ?? m.common_unknown_person()}
			</div>
			<div class="text-second-600 dark:text-second-500">
				@{handle ?? m.common_unknown_organisation()}
			</div>
		</div>
	</figcaption>
</figure>
