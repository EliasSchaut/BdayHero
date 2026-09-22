<script lang="ts">
	let { title, class: className = '' }: { title: string; class?: string } = $props();
</script>

<h2 class="text-center text-xl italic underline {className}">{title}</h2>
