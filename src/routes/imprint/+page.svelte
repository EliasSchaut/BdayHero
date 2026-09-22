<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/ui/Card.svelte';
	import Identification from '~icons/heroicons/identification';

	const imprint = { name: 'Elias Lorenz Schaut', email: 'elias@schaut.dev' };
</script>

<svelte:head>
	<title>{m.imprint_title()} · Kids Bday 2026</title>
</svelte:head>

<div class="mx-4 my-10 flex flex-row justify-center">
	<Card title={m.imprint_title()} icon={Identification} class="w-full sm:w-1/2">
		<p>{m.imprint_declaration()}</p>
		<p>{imprint.name}</p>
		<p>
			<b>{m.imprint_contact()}:</b><br />
			{m.imprint_email()}: <a class="underline" href="mailto:{imprint.email}">{imprint.email}</a>
		</p>
	</Card>
</div>
