<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import ButtonPrime from './ButtonPrime.svelte';
	import CalendarDays from '~icons/heroicons/calendar-days-16-solid';

	const GOOGLE =
		'https://calendar.google.com/calendar/u/0/r/eventedit?&dates=20260603T180000/20260604T040000&ctz=Europe/Berlin&text=KidsBday26&location=Klosterweg+28+(Haus+K2),+76131+Karlsruhe&details=Am+03.+Juni+2026+steigt+die+Geburtstagsparty+des+Jahres!+Mehr+Infos+siehe+https://bday.schaut.dev';
	const OUTLOOK =
		'https://outlook.live.com/calendar/0/action/compose?rru=addevent&startdt=2026-06-03T16:00:00Z&enddt=2026-06-04T02:00:00Z&subject=KidsBday26&location=Klosterweg%2028%20(Haus%20K2)%2C%2076131%20Karlsruhe&body=Am%2003.%20Juni%202026%20steigt%20die%20Geburtstagsparty%20des%20Jahres!%20Mehr%20Infos%20siehe%20https%3A%2F%2Fbday.schaut.dev';
	const ICAL = '/ical/kids_bday.ics';
</script>

<Dropdown align="start">
	{#snippet trigger()}
		<ButtonPrime type="button">{m.home_hero_add_to_calendar()}</ButtonPrime>
	{/snippet}
	<DropdownItem href={GOOGLE} target="_blank">
		<img src="/icon/google_calendar.png" alt="" width="16" height="16" class="size-4" />
		<span>Google</span>
	</DropdownItem>
	<DropdownItem href={ICAL}>
		<img src="/icon/apple.png" alt="" width="16" height="16" class="size-4" />
		<span>Apple</span>
	</DropdownItem>
	<DropdownItem href={OUTLOOK} target="_blank">
		<img src="/icon/outlook.png" alt="" width="16" height="16" class="size-4" />
		<span>Outlook</span>
	</DropdownItem>
	<DropdownItem href={ICAL}>
		<CalendarDays class="size-4" aria-hidden="true" />
		<span>iCal</span>
	</DropdownItem>
</Dropdown>
