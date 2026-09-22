<script lang="ts">
	let {
		title,
		description,
		date,
		href
	}: { title: string; description: string; date: string; href: string } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener"
	class="group flex flex-col items-center justify-start gap-6 rounded-2xl bg-white p-5 hover:bg-second-100 sm:flex-row dark:bg-second-950 dark:hover:bg-second-900"
>
	<div class="flex max-w-xl flex-col items-start justify-between">
		<time class="text-xs text-second-500 dark:text-second-400">{date}</time>
		<h3
			class="mt-3 text-lg leading-6 font-semibold text-second-900 group-hover:text-second-600 dark:text-white dark:group-hover:text-second-200"
		>
			{title}
		</h3>
		<p class="mt-5 line-clamp-3 text-sm leading-6 text-second-600 dark:text-second-100">
			{description}
		</p>
	</div>
</a>
