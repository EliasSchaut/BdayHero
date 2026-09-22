<script lang="ts">
	import type { Snippet } from 'svelte';
	import { DropdownMenu } from 'bits-ui';

	let {
		trigger,
		children,
		class: className = '',
		align = 'end'
	}: { trigger: Snippet; children: Snippet; class?: string; align?: 'start' | 'end' } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex justify-center {className}">
		{@render trigger()}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{align}
			sideOffset={8}
			class="data-[state=closed]:animate-out data-[state=open]:animate-in z-50 min-w-36 origin-top-right divide-y divide-second-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 outline-none dark:divide-second-700 dark:bg-second-800 dark:text-white"
		>
			{@render children()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
