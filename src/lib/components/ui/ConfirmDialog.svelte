<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AlertDialog } from 'bits-ui';

	let {
		open = $bindable(false),
		title,
		body,
		cancelLabel,
		confirmLabel,
		onConfirm,
		trigger
	}: {
		open?: boolean;
		title: string;
		body: string;
		cancelLabel: string;
		confirmLabel: string;
		onConfirm: () => void;
		trigger?: Snippet;
	} = $props();
</script>

<AlertDialog.Root bind:open>
	{#if trigger}
		<AlertDialog.Trigger>{@render trigger()}</AlertDialog.Trigger>
	{/if}
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
		<AlertDialog.Content
			class="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl outline-none dark:bg-second-900"
		>
			<AlertDialog.Title class="text-lg font-semibold">{title}</AlertDialog.Title>
			<AlertDialog.Description class="mt-2 text-sm text-second-600 dark:text-second-300">
				{body}
			</AlertDialog.Description>
			<div class="mt-6 flex justify-end gap-x-3">
				<AlertDialog.Cancel
					class="rounded-md bg-second-100 px-3.5 py-1.5 text-sm font-semibold hover:bg-second-200 dark:bg-second-800 dark:hover:bg-second-700"
				>
					{cancelLabel}
				</AlertDialog.Cancel>
				<AlertDialog.Action
					onclick={onConfirm}
					class="rounded-md bg-red-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
				>
					{confirmLabel}
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
