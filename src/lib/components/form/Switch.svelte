<script lang="ts">
	import { Switch } from 'bits-ui';

	let {
		id,
		checked = $bindable(false),
		label
	}: { id: string; checked?: boolean; label?: string } = $props();
</script>

<Switch.Root
	{id}
	name={id}
	bind:checked
	aria-label={label}
	class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-second-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-prime-600 focus:ring-offset-2 focus:outline-hidden data-[state=checked]:bg-prime-600 dark:bg-second-700"
>
	<Switch.Thumb
		class="pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
	>
		<span
			class="absolute inset-0 flex size-full items-center justify-center transition-opacity {checked
				? 'opacity-0 duration-100 ease-out'
				: 'opacity-100 duration-200 ease-in'}"
			aria-hidden="true"
		>
			<svg class="size-3 text-second-400 dark:text-second-600" fill="none" viewBox="0 0 12 12">
				<path
					d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<span
			class="absolute inset-0 flex size-full items-center justify-center transition-opacity {checked
				? 'opacity-100 duration-200 ease-in'
				: 'opacity-0 duration-100 ease-out'}"
			aria-hidden="true"
		>
			<svg
				class="size-3 text-prime-600 dark:text-prime-500"
				fill="currentColor"
				viewBox="0 0 12 12"
			>
				<path
					d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
				/>
			</svg>
		</span>
	</Switch.Thumb>
</Switch.Root>
