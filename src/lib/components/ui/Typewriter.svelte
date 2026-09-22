<script lang="ts">
	/**
	 * Types the given strings one after another in a loop. Pauses while the
	 * element is off-screen and renders the first string statically when the
	 * visitor prefers reduced motion.
	 */
	let {
		strings,
		typeDelay = 70,
		deleteDelay = 40,
		pause = 1600,
		class: className = ''
	}: {
		strings: string[];
		typeDelay?: number;
		deleteDelay?: number;
		pause?: number;
		class?: string;
	} = $props();

	let el: HTMLSpanElement;
	let text = $state('');
	let visible = $state(true);
	let reduced = $state(false);

	$effect(() => {
		reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		observer.observe(el);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (reduced) {
			text = strings[0] ?? '';
			return;
		}
		if (!visible) return;
		let index = 0;
		let position = 0;
		let deleting = false;
		let timer: ReturnType<typeof setTimeout>;

		const tick = () => {
			const current = strings[index] ?? '';
			if (!deleting) {
				position++;
				text = current.slice(0, position);
				if (position >= current.length) {
					deleting = true;
					timer = setTimeout(tick, pause);
					return;
				}
				timer = setTimeout(tick, typeDelay);
			} else {
				position--;
				text = current.slice(0, position);
				if (position <= 0) {
					deleting = false;
					index = (index + 1) % strings.length;
				}
				timer = setTimeout(tick, deleteDelay);
			}
		};
		timer = setTimeout(tick, typeDelay);
		return () => clearTimeout(timer);
	});
</script>

<span bind:this={el} class="font-bold text-pink-500 dark:text-pink-400 {className}"
	>{text}<span class="animate-pulse" aria-hidden="true">|</span></span
>
