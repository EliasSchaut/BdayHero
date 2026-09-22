<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import DescriptionList from '$lib/components/ui/DescriptionList.svelte';
	import DescriptionItem from '$lib/components/ui/DescriptionItem.svelte';
	import LinkUnderlined from '$lib/components/ui/LinkUnderlined.svelte';
	import CalendarDropdown from '$lib/components/ui/CalendarDropdown.svelte';
	import HeadingItalic from '$lib/components/ui/HeadingItalic.svelte';
	import Faq from '$lib/components/ui/Faq.svelte';

	const KVV =
		'https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_destination=Karlsruhe%2C+Klosterweg+28&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=03.06.2026&itdTime=18%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=15&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]';
	const kvvFrom = (name: string, id: string) =>
		`${KVV}&name_origin=${encodeURIComponent(name)}&nameInfo_origin=${encodeURIComponent(id)}`;

	const program = $derived(
		[
			m.detail_program_value_0,
			m.detail_program_value_1,
			m.detail_program_value_2,
			m.detail_program_value_3,
			m.detail_program_value_4,
			m.detail_program_value_5,
			m.detail_program_value_6,
			m.detail_program_value_7
		].map((f) => f())
	);

	const faqs = $derived(
		(
			[
				[m.detail_faq_0_title, m.detail_faq_0_value],
				[m.detail_faq_1_title, m.detail_faq_1_value],
				[m.detail_faq_2_title, m.detail_faq_2_value],
				[m.detail_faq_3_title, m.detail_faq_3_value],
				[m.detail_faq_4_title, m.detail_faq_4_value],
				[m.detail_faq_5_title, m.detail_faq_5_value],
				[m.detail_faq_6_title, m.detail_faq_6_value],
				[m.detail_faq_7_title, m.detail_faq_7_value]
			] as const
		).map(([q, a]) => ({ question: q(), answer: a() }))
	);
</script>

<svelte:head>
	<title>{m.detail_title()} · Kids Bday 2026</title>
</svelte:head>

<DescriptionList title={m.detail_title()} subtitle={m.detail_subtitle()}>
	<DescriptionItem title={m.detail_begin_title()}>{m.detail_begin_value()}</DescriptionItem>
	<DescriptionItem title={m.detail_location_title()}>
		<span>{m.detail_location_value()}</span>
		<LinkUnderlined value="GoogleMaps" href="https://maps.app.goo.gl/ARw5YZphkyWSiqEi8" />
		<LinkUnderlined
			value="Apple Karten"
			href="https://maps.apple.com/?address=Klosterweg%2030,%2076131%20Karlsruhe,%20Deutschland&auid=13013047162473329048&ll=49.020084,8.422487&lsp=9902&q=Hans%20Dickmann%20Kolleg%20-%20K2&t=m"
		/>
		<LinkUnderlined
			value="OpenStreetMap"
			href="https://www.openstreetmap.org/?mlat=49.02014&mlon=8.42261#map=19/49.02014/8.42261&layers=N"
		/>
	</DescriptionItem>
	<DescriptionItem title={m.detail_theme_title()}>{m.detail_theme_value()}</DescriptionItem>
	<DescriptionItem title={m.detail_arrival_title()}>
		<ul>
			<li>
				{m.detail_arrival_value_car()}
				<LinkUnderlined
					value={m.detail_arrival_value_car_sharing()}
					href="https://chat.whatsapp.com/Ei50VQfokLnLWbKz1Ygi5a"
				/>
			</li>
			<li>
				{m.detail_arrival_value_public()}:
				<LinkUnderlined
					value={m.detail_arrival_value_public_central_station()}
					href={kvvFrom('Karlsruhe, Hauptbahnhof', '7000090')}
				/>
				<LinkUnderlined
					value={m.detail_arrival_value_public_hagsfeld()}
					href={kvvFrom('Hagsfeld, Hagsfeld Bahnhof', '7003102')}
				/>
				<LinkUnderlined
					value={m.detail_arrival_value_public_durlach()}
					href={kvvFrom('Durlach, Durlach Bahnhof', '7000802:$22')}
				/>
			</li>
		</ul>
	</DescriptionItem>
	<DescriptionItem title={m.detail_program_title()}>
		<ul>
			{#each program as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</DescriptionItem>
	<DescriptionItem title={m.detail_catering_title()}>{m.detail_catering_value()}</DescriptionItem>
</DescriptionList>

<div class="mt-4 flex justify-center"><CalendarDropdown /></div>

<HeadingItalic class="my-10" title="FAQ" />
<Faq {faqs} class="rounded-2xl" />
