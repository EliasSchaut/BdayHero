<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';
	import { m } from '$lib/paraglide/messages';
	import { NAME_PATTERN_HTML } from '$lib/schemas/guest';

	let {
		id,
		label = '',
		class: className = '',
		...rest
	}: HTMLInputAttributes & { id: string; label?: string; class?: string } = $props();
</script>

<Input
	{id}
	type="text"
	{label}
	pattern={NAME_PATTERN_HTML}
	minlength={2}
	maxlength={20}
	invalidPatternFeedback={m.common_form_name_pattern()}
	class={className}
	{...rest}
/>
