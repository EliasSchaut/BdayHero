<script lang="ts">
	import { page } from '$app/state';
</script>

<h1 class="p-8 text-3xl font-bold">BdayHero</h1>
<p class="px-8">{page.data.user ? `Signed in as ${page.data.user.email}` : 'Not signed in'}</p>
