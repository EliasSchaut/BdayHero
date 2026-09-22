<script lang="ts">
	import type { Snippet } from 'svelte';
	import { RadioGroup } from 'bits-ui';

	let { value, children }: { value: string; children: Snippet } = $props();
</script>

<RadioGroup.Item
	{value}
	class="flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold uppercase ring-1 ring-second-300 hover:bg-second-50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-prime-600 focus-visible:ring-offset-2 data-[state=checked]:bg-prime-600 data-[state=checked]:text-white data-[state=checked]:ring-0 data-[state=checked]:hover:bg-prime-500 sm:flex-1 dark:bg-second-900 dark:ring-second-700 dark:hover:bg-second-950"
>
	{@render children()}
</RadioGroup.Item>
