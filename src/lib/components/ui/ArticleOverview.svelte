<script lang="ts">
	import ArticlePreview from './ArticlePreview.svelte';
	export interface Article {
		title: string;
		href: string;
		date: string;
		description: string;
	}
	let { articles }: { articles: Article[] } = $props();
</script>

<div class="flex justify-center">
	<ul
		class="z-10 mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-10 sm:grid-cols-2 sm:gap-y-16 md:mx-0 md:max-w-none lg:grid-cols-3"
	>
		{#each articles as article (article.href)}
			<li><ArticlePreview {...article} /></li>
		{/each}
	</ul>
</div>
