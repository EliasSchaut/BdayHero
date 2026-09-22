<script lang="ts">
	import '../app.css';
	import { untrack } from 'svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { alert } from '$lib/stores/alert.svelte';

	let { data, children } = $props();
	let theme = $state(untrack(() => data.theme));

	$effect(() => {
		if (data.flash) alert.feedback(data.flash);
	});
</script>

<svelte:head>
	<title>Kids Bday 2026</title>
	<meta name="description" content="Save the Date - Kids Bday is on June 3, 2026" />
	<meta name="keywords" content="bday, meta, kid, elias, event, karlsruhe, hadiko" />
	<meta property="og:title" content="Kids Bday 2026" />
	<meta property="og:description" content="Save the Date - Kids Bday is on June 3, 2026" />
	<meta property="og:image" content="/favicon/thumbnail.png" />
</svelte:head>

<div class="flex min-h-screen flex-col justify-between">
	<Nav heroOnly={data.heroOnly} bind:theme />
	<main class="mb-auto">
		<Alert />
		{@render children()}
	</main>
	<Footer />
</div>
