<script lang="ts">
	import Divider from './Divider.svelte';
	import Plus from '~icons/heroicons/plus-20-solid';
	let { class: className = '' }: { class?: string } = $props();
</script>

<Divider class={className}>
	<div class="relative flex justify-center">
		<span class="bg-second-100 px-2 text-second-500 dark:bg-second-800">
			<Plus class="size-5 text-second-500" aria-hidden="true" />
		</span>
	</div>
</Divider>
