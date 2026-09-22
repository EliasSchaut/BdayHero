<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/ui/Card.svelte';
	import Faq from '$lib/components/ui/Faq.svelte';
	import Clipboard from '~icons/heroicons/clipboard-document-check';

	const faqs = $derived([
		{ question: m.privacy_data_title(), answer: m.privacy_data_body() },
		{ question: m.privacy_registration_title(), answer: m.privacy_registration_body() },
		{ question: m.privacy_cookies_title(), answer: m.privacy_cookies_body() },
		{ question: m.privacy_rights_title(), answer: m.privacy_rights_body() }
	]);
</script>

<svelte:head>
	<title>{m.privacy_title()} · Kids Bday 2027</title>
</svelte:head>

<div class="mx-4 my-10 flex flex-row justify-center">
	<Card title={m.privacy_title()} icon={Clipboard} class="w-full lg:w-2/3">
		<Faq {faqs} />
	</Card>
</div>
