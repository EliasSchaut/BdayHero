<script lang="ts">
	import { alert } from '$lib/stores/alert.svelte';
	import { m } from '$lib/paraglide/messages';
	import XCircle from '~icons/heroicons/x-circle-20-solid';
	import CheckCircle from '~icons/heroicons/check-circle-20-solid';
	import Warning from '~icons/heroicons/exclamation-triangle-20-solid';
	import Info from '~icons/heroicons/information-circle-20-solid';
	import XMark from '~icons/heroicons/x-mark-20-solid';
	import { fly } from 'svelte/transition';

	const styles = {
		danger: {
			box: 'bg-red-50 ring-red-100 dark:bg-red-950 dark:ring-red-900',
			icon: 'text-red-400 dark:text-red-300',
			text: 'text-red-800 dark:text-red-200',
			button:
				'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900'
		},
		success: {
			box: 'bg-green-50 ring-green-100 dark:bg-green-950 dark:ring-green-900',
			icon: 'text-green-400 dark:text-green-300',
			text: 'text-green-800 dark:text-green-200',
			button:
				'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900'
		},
		warn: {
			box: 'bg-yellow-50 ring-yellow-100 dark:bg-yellow-950 dark:ring-yellow-900',
			icon: 'text-yellow-400 dark:text-yellow-300',
			text: 'text-yellow-800 dark:text-yellow-200',
			button:
				'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 dark:bg-yellow-950 dark:text-yellow-400 dark:hover:bg-yellow-900'
		},
		info: {
			box: 'bg-blue-50 ring-blue-100 dark:bg-blue-950 dark:ring-blue-900',
			icon: 'text-blue-400 dark:text-blue-300',
			text: 'text-blue-800 dark:text-blue-200',
			button:
				'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900'
		}
	};
	const icons = { danger: XCircle, success: CheckCircle, warn: Warning, info: Info };
	const style = $derived(styles[alert.type]);
	const Icon = $derived(icons[alert.type]);
</script>

{#if alert.visible}
	<div class="relative flex w-full justify-center px-4 pt-2 sm:px-0" transition:fly={{ y: -16 }}>
		<div role="status" class="w-full p-4 ring-2 sm:w-2/3 sm:rounded-md {style.box}">
			<div class="flex items-center">
				<div class="flex shrink-0"><Icon class="size-5 {style.icon}" aria-hidden="true" /></div>
				<div class="ml-3"><p class="text-sm font-medium {style.text}">{alert.message}</p></div>
				<div class="ml-auto flex pl-3">
					<button
						type="button"
						onclick={() => alert.hide()}
						class="-m-1.5 inline-flex rounded-md p-1.5 focus:ring-2 focus:ring-offset-2 focus:outline-none {style.button}"
					>
						<span class="sr-only">{m.common_alert_dismiss()}</span>
						<XMark class="size-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
