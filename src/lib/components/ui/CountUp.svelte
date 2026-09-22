<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let {
		value,
		duration = 3000,
		delay = 0,
		class: className = ''
	}: { value: number; duration?: number; delay?: number; class?: string } = $props();

	const tween = new Tween(0, {
		duration: untrack(() => duration),
		easing: cubicOut,
		delay: untrack(() => delay)
	});
	$effect(() => {
		tween.target = value;
	});
</script>

<span class={className}>{Math.round(tween.current)}</span>
