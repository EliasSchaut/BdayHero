<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg aria-hidden="true" viewBox="0 0 640 480" class={className}>
	<path fill="#ffce00" d="M0 320h640v160H0z" />
	<path d="M0 0h640v160H0z" />
	<path fill="#d00" d="M0 160h640v160H0z" />
</svg>
