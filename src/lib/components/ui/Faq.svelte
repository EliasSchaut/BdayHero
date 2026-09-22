<script lang="ts">
	import { Accordion } from 'bits-ui';
	import Plus from '~icons/heroicons/plus-16-solid';
	import Minus from '~icons/heroicons/minus-16-solid';

	let {
		faqs,
		class: className = ''
	}: { faqs: { question: string; answer: string }[]; class?: string } = $props();
</script>

<div class="mx-auto px-6 pb-6 {className}">
	<Accordion.Root type="single" class="divide-y divide-second-900/10 dark:divide-white/10">
		{#each faqs as faq, i (i)}
			<Accordion.Item value={String(i)} class="py-6">
				<Accordion.Header>
					<Accordion.Trigger
						class="group flex w-full items-start justify-between text-left text-second-900 dark:text-white"
					>
						<span class="text-base leading-7 font-semibold">{faq.question}</span>
						<span class="ml-6 flex h-7 items-center">
							<Plus class="size-6 group-data-[state=open]:hidden" aria-hidden="true" />
							<Minus class="size-6 group-data-[state=closed]:hidden" aria-hidden="true" />
						</span>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class="mt-2 pr-12">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- answers come from our own translation files -->
					<p class="text-base leading-7 text-second-600 dark:text-second-300">{@html faq.answer}</p>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>
