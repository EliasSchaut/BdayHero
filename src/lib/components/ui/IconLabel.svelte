<script lang="ts">
	import type { Snippet } from 'svelte';
	import CheckOutline from '~icons/heroicons/check-circle';
	import CheckSolid from '~icons/heroicons/check-circle-20-solid';
	import QuestionOutline from '~icons/heroicons/question-mark-circle';
	import QuestionSolid from '~icons/heroicons/question-mark-circle-20-solid';
	import XOutline from '~icons/heroicons/x-circle';
	import XSolid from '~icons/heroicons/x-circle-20-solid';

	let {
		icon,
		solid = false,
		children
	}: { icon: 'check' | 'question' | 'x'; solid?: boolean; children: Snippet } = $props();

	const icons = {
		check: { outline: CheckOutline, solid: CheckSolid },
		question: { outline: QuestionOutline, solid: QuestionSolid },
		x: { outline: XOutline, solid: XSolid }
	};
	const Icon = $derived(solid ? icons[icon].solid : icons[icon].outline);
</script>

<div class="flex flex-col items-center gap-y-1">
	<Icon class="size-5" aria-hidden="true" />
	{@render children()}
</div>
