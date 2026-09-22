<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { featureImage } from '$lib/assets/img';
	import Accent from '$lib/components/ui/Accent.svelte';
	import Underline from '$lib/components/ui/Underline.svelte';
	import Typewriter from '$lib/components/ui/Typewriter.svelte';
	import ButtonPrime from '$lib/components/ui/ButtonPrime.svelte';
	import ButtonArrow from '$lib/components/ui/ButtonArrow.svelte';
	import BackgroundBlob from '$lib/components/layout/BackgroundBlob.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SectionTag from '$lib/components/layout/SectionTag.svelte';
	import SectionHeading from '$lib/components/layout/SectionHeading.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Card3d from '$lib/components/ui/Card3d.svelte';
	import Testimonial from '$lib/components/ui/Testimonial.svelte';
	import TestimonialGrid from '$lib/components/ui/TestimonialGrid.svelte';
	import ArticleOverview from '$lib/components/ui/ArticleOverview.svelte';
	import CalendarDropdown from '$lib/components/ui/CalendarDropdown.svelte';
	import carmen from '$lib/assets/img/testimonials/carmen_schaut.jpg';
	import niklas from '$lib/assets/img/testimonials/niklas_kniep.jpg';
	import valentin from '$lib/assets/img/testimonials/valentin_quapil.jpg';
	import sean from '$lib/assets/img/testimonials/sean_ireland.jpg';
	import laura from '$lib/assets/img/testimonials/laura_blechschmidt.jpg';

	let { data } = $props();

	const typewriterStrings = $derived([
		m.home_typewriter_suffix_0(),
		m.home_typewriter_suffix_1(),
		m.home_typewriter_suffix_2(),
		m.home_typewriter_suffix_3(),
		m.home_typewriter_suffix_4(),
		m.home_typewriter_suffix_5(),
		m.home_typewriter_suffix_6(),
		m.home_typewriter_suffix_7(),
		m.home_typewriter_suffix_8(),
		m.home_typewriter_suffix_9(),
		m.home_typewriter_suffix_10(),
		m.home_typewriter_suffix_11(),
		m.home_typewriter_suffix_12(),
		m.home_typewriter_suffix_13()
	]);

	type Feature = { title: string; subtitle: string; image: string };
	const featureTabs = $derived<{ id: string; title: string; cards: Feature[] }[]>([
		{
			id: 'featured',
			title: m.home_tabs_featured_title(),
			cards: [
				{
					title: m.home_tabs_featured_karaoke_title(),
					subtitle: m.home_tabs_featured_karaoke_subtitle(),
					image: 'karaoke'
				},
				{
					title: m.home_tabs_featured_dj_title(),
					subtitle: m.home_tabs_featured_dj_subtitle(),
					image: 'dj_paul'
				},
				{
					title: m.home_tabs_featured_team_title(),
					subtitle: m.home_tabs_featured_team_subtitle(),
					image: 'fight'
				},
				{
					title: m.home_tabs_featured_meta_title(),
					subtitle: m.home_tabs_featured_meta_subtitle(),
					image: 'meta'
				},
				{
					title: m.home_tabs_featured_photobox_title(),
					subtitle: m.home_tabs_featured_photobox_subtitle(),
					image: 'photobox'
				},
				{
					title: m.home_tabs_featured_art_title(),
					subtitle: m.home_tabs_featured_art_subtitle(),
					image: 'art'
				}
			]
		},
		{
			id: 'events',
			title: m.home_tabs_events_title(),
			cards: [
				{
					title: m.home_tabs_featured_speed_friending_title(),
					subtitle: m.home_tabs_featured_speed_friending_subtitle(),
					image: 'speed_friending'
				},
				{
					title: m.home_tabs_events_olympia_title(),
					subtitle: m.home_tabs_events_olympia_subtitle(),
					image: 'olympia'
				}
			]
		},
		{
			id: 'game',
			title: m.home_tabs_game_title(),
			cards: [
				{
					title: m.home_tabs_game_pool_title(),
					subtitle: m.home_tabs_game_pool_subtitle(),
					image: 'billard'
				},
				{
					title: m.home_tabs_game_corner_title(),
					subtitle: m.home_tabs_game_corner_subtitle(),
					image: 'gaming_ecke'
				},
				{
					title: m.home_tabs_game_outdoor_title(),
					subtitle: m.home_tabs_game_outdoor_subtitle(),
					image: 'outdoor_games'
				},
				{
					title: m.home_tabs_game_indoor_title(),
					subtitle: m.home_tabs_game_indoor_subtitle(),
					image: 'indoor_games'
				}
			]
		},
		{
			id: 'drinks',
			title: m.home_tabs_drinks_title(),
			cards: [
				{
					title: m.home_tabs_drinks_cocktails_title(),
					subtitle: m.home_tabs_drinks_cocktails_subtitle(),
					image: 'cocktails'
				},
				{
					title: m.home_tabs_drinks_soft_title(),
					subtitle: m.home_tabs_drinks_soft_subtitle(),
					image: 'softdrinks'
				},
				{
					title: m.home_tabs_drinks_beer_title(),
					subtitle: m.home_tabs_drinks_beer_subtitle(),
					image: 'zapfe'
				}
			]
		},
		{
			id: 'food',
			title: m.home_tabs_food_title(),
			cards: [
				{
					title: m.home_tabs_food_grill_title(),
					subtitle: m.home_tabs_food_grill_subtitle(),
					image: 'grill'
				},
				{
					title: m.home_tabs_food_finger_food_title(),
					subtitle: m.home_tabs_food_finger_food_subtitle(),
					image: 'fingerfood'
				},
				{
					title: m.home_tabs_food_ice_title(),
					subtitle: m.home_tabs_food_ice_subtitle(),
					image: 'eis'
				}
			]
		}
	]);

	const testimonials = $derived([
		{
			cite: m.home_testimonial_0_cite(),
			name: 'Carmen Schaut',
			handle: m.home_testimonial_0_handle(),
			avatar: carmen
		},
		{
			cite: m.home_testimonial_1_cite(),
			name: 'Niklas Kniep',
			handle: m.home_testimonial_1_handle(),
			avatar: niklas
		},
		{
			cite: m.home_testimonial_2_cite(),
			name: 'Valentin Quapil',
			handle: m.home_testimonial_2_handle(),
			avatar: valentin
		},
		{
			cite: m.home_testimonial_3_cite(),
			name: 'Sean Ireland',
			handle: m.home_testimonial_3_handle(),
			avatar: sean
		},
		{
			cite: m.home_testimonial_4_cite(),
			name: 'Laura Blechschmidt',
			handle: m.home_testimonial_4_handle(),
			avatar: laura
		},
		{ cite: m.home_testimonial_5_cite(), handle: m.home_testimonial_5_handle() }
	]);

	const blogDescriptions = [
		[25, m.home_blog_bday25_desc],
		[24, m.home_blog_bday24_desc],
		[23, m.home_blog_bday23_desc],
		[22, m.home_blog_bday22_desc],
		[21, m.home_blog_bday21_desc]
	] as const;
	const articles = $derived(
		blogDescriptions.map(([n, desc]) => ({
			title: `Bday ${n}`,
			description: desc(),
			href: `https://schaut.dev/articles/bday${n}`,
			date: `${m.home_blog_date()} 20${n}`
		}))
	);
</script>

<!-- hero -->
<section class="relative z-10 px-6 py-20 pb-16 text-center lg:py-32">
	<BackgroundBlob position="top" />
	<h1
		class="mx-auto max-w-4xl text-5xl font-medium tracking-tight text-second-900 sm:text-7xl dark:text-second-100"
	>
		<span>Save </span><Underline>the DATE</Underline>
	</h1>
	<p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-second-700 dark:text-second-300">
		<span>{m.home_hero_1()}</span><Accent>{m.home_hero_date()}</Accent><span>{m.home_hero_2()}</span
		>
		<Typewriter strings={typewriterStrings} />
		<br />
		<span>{m.home_hero_3()}</span>
	</p>
	<div class="z-50 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
		{#if data.heroOnly}
			<ButtonPrime type="button" disabled title={m.home_hero_registration_soon_hint()}>
				{m.home_hero_registration_soon()}
			</ButtonPrime>
			<CalendarDropdown />
			<ButtonArrow href="#community">{m.home_hero_join_community()}</ButtonArrow>
		{:else}
			<a href="/guests"><ButtonPrime type="button">{m.home_hero_join_now()}</ButtonPrime></a>
			<ButtonArrow href="/details">{m.home_hero_details()}</ButtonArrow>
		{/if}
	</div>
	{#if data.heroOnly}
		<p class="mt-4 text-sm text-second-500 dark:text-second-400">
			{m.home_hero_registration_soon_hint()}
		</p>
	{/if}
	<BackgroundBlob position="bottom" />
</section>

<!-- features -->
<Section id="features" background="grid">
	<SectionTag class="pt-40">{m.nav_features()}</SectionTag>
	<SectionHeading>{m.home_tabs_title()}</SectionHeading>
	<Tabs tabs={featureTabs}>
		{#snippet panel(tab)}
			{#each featureTabs.find((t) => t.id === tab.id)?.cards ?? [] as card (card.image)}
				<Card3d title={card.title} subtitle={card.subtitle} image={featureImage(card.image)} />
			{/each}
		{/snippet}
	</Tabs>
</Section>

<!-- testimonials -->
<Section>
	<SectionTag>{m.home_testimonials_tag()}</SectionTag>
	<SectionHeading>{m.home_testimonials_title()}</SectionHeading>
	<TestimonialGrid>
		{#each testimonials as testimonial (testimonial.cite)}
			<div class="pt-8 sm:inline-block sm:w-full sm:px-4">
				<Testimonial {...testimonial} />
			</div>
		{/each}
	</TestimonialGrid>
</Section>

<!-- blog -->
<Section id="blog" background="dots">
	<SectionTag class="pt-40">{m.home_blog_tag()}</SectionTag>
	<SectionHeading>{m.home_blog_title()}</SectionHeading>
	<ArticleOverview {articles} />
</Section>

<!-- community -->
<section id="community" class="py-16 sm:py-24">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div
			class="relative isolate overflow-hidden bg-second-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 dark:bg-second-900"
		>
			<h2
				class="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
			>
				{m.home_community_head()}
			</h2>
			<p class="mx-auto mt-6 max-w-lg text-center text-lg text-second-300">
				{m.home_community_content()}
			</p>
			<a
				class="mx-auto mt-10 flex w-min items-center justify-center gap-x-2 rounded-md bg-white px-12 py-2.5 text-sm font-semibold text-second-900 shadow-xs hover:bg-second-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xs:w-fit"
				href="https://chat.whatsapp.com/HF1UyLxp5Yc33L8s5rHFGi"
				target="_blank"
				rel="noopener"
			>
				<img src="/svg/whatsapp.svg" height="20" width="20" alt="" />
				<span class="text-nowrap">{m.home_community_join()}</span>
			</a>
			<svg
				viewBox="0 0 1024 1024"
				class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2"
				aria-hidden="true"
			>
				<circle cx="512" cy="512" r="512" fill="url(#community-gradient)" fill-opacity="0.7" />
				<defs>
					<radialGradient
						id="community-gradient"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(512 512) rotate(90) scale(512)"
					>
						<stop stop-color="#7775D6" />
						<stop offset="1" stop-color="#E935C1" stop-opacity="0" />
					</radialGradient>
				</defs>
			</svg>
		</div>
	</div>
</section>
