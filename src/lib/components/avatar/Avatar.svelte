<script lang="ts">
	let {
		initials,
		src = null,
		class: className = 'size-9'
	}: { initials: string; src?: string | null; class?: string } = $props();
</script>

<div class="min-w-fit">
	{#if src}
		<img
			class="inline-block rounded-full {className}"
			{src}
			alt=""
			width="36"
			height="36"
			loading="lazy"
		/>
	{:else}
		<span class="inline-flex items-center justify-center rounded-full bg-second-500 {className}">
			<span class="font-medium text-white">{initials}</span>
		</span>
	{/if}
</div>
