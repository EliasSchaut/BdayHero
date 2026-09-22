<script lang="ts">
	let {
		initials,
		src = null,
		name = '',
		small = false
	}: { initials: string; src?: string | null; name?: string; small?: boolean } = $props();
</script>

{#if src}
	<img
		class="relative inline-block rounded-full ring-2 ring-white dark:ring-second-900 {small
			? 'size-6'
			: 'size-8'}"
		{src}
		alt=""
		title={name}
		loading="lazy"
	/>
{:else}
	<span
		title={name}
		class="relative inline-flex items-center justify-center rounded-full bg-second-500 ring-2 ring-white dark:ring-second-900 {small
			? 'size-6'
			: 'size-8'}"
	>
		<span class="font-medium text-white {small ? 'text-xs' : 'text-sm'}">{initials}</span>
	</span>
{/if}
