<script lang="ts">
	let { value, href }: { value: string; href: string } = $props();
</script>

[<a class="text-nowrap underline" target="_blank" rel="noopener" {href}>{value}</a>]
