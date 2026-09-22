<script lang="ts">
	import type { Picture } from '$lib/types/image';

	let {
		title,
		subtitle,
		image,
		alt = title
	}: { title: string; subtitle: string; image: Picture; alt?: string } = $props();

	let card: HTMLDivElement;
	let hovered = $state(false);
	let rotate = $state({ x: 0, y: 0 });
	let rect: DOMRect | null = null;
	let frame = 0;

	function onEnter() {
		hovered = true;
		rect = card.getBoundingClientRect();
	}
	function onMove(e: PointerEvent) {
		if (!rect || frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			if (!rect) return;
			rotate = {
				y: -(e.clientX - rect.left - rect.width / 2) / 25,
				x: (e.clientY - rect.top - rect.height / 2) / 25
			};
		});
	}
	function onLeave() {
		hovered = false;
		rotate = { x: 0, y: 0 };
		rect = null;
	}
</script>

<div class="flex items-center" style:perspective="1000px">
	<div
		bind:this={card}
		role="presentation"
		onpointerenter={onEnter}
		onpointermove={onMove}
		onpointerleave={onLeave}
		class="flex items-center justify-center transition-transform duration-200 ease-linear motion-reduce:transition-none"
		style:transform-style="preserve-3d"
		style:transform="rotateY({rotate.y}deg) rotateX({rotate.x}deg)"
	>
		<div
			class="group/card w-[16rem] rounded-xl border border-black/10 bg-gray-50 p-6 transform-3d *:transform-3d xs:w-[20rem] dark:border-white/20 dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10"
		>
			<p
				class="w-fit text-xl font-bold text-neutral-600 transition duration-200 ease-linear dark:text-white"
				style:transform={hovered ? 'translateZ(50px)' : 'translateZ(0)'}
			>
				{title}
			</p>
			<p
				class="mt-2 w-fit max-w-sm text-sm text-neutral-500 transition duration-200 ease-linear dark:text-neutral-300"
				style:transform={hovered ? 'translateZ(60px)' : 'translateZ(0)'}
			>
				{subtitle}
			</p>
			<div
				class="mt-4 w-full transition duration-200 ease-linear"
				style:transform={hovered ? 'translateZ(100px)' : 'translateZ(0)'}
			>
				<enhanced:img
					src={image}
					{alt}
					sizes="(min-width: 475px) 272px, 208px"
					loading="lazy"
					class="h-30 w-full rounded-xl object-cover object-center group-hover/card:shadow-xl"
				/>
			</div>
		</div>
	</div>
</div>
