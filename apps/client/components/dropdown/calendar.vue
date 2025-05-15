<template>
  <Dropdown>
    <DropdownButton>
      <ButtonPrime>{{ $t("home.hero.add_to_calendar") }}</ButtonPrime>
    </DropdownButton>
    <DropdownMenu>
      <DropdownMenuItemLink
        href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20250607T180000/20250608T040000&ctz=Europe/Berlin&text=Kids+Bday&location=Klosterweg+28+(Haus+K2),+76131+Karlsruhe&details=Am+07.+Juni+2025+steigt+die+Geburtstagsparty+des+Jahres!+Halte+den+Termin+frei+und+sei+dabei!&crm=BUSY&trp=true"
        target="_blank"
      >
        <NuxtImg
          src="/icon/google_calendar.png"
          alt="Google Calendar Logo"
          class="h-[16px] w-[16px]"
        />
        <span>Google</span>
      </DropdownMenuItemLink>
      <DropdownMenuItemLink href="/ical/kids_bday.ics">
        <NuxtImg
          src="/icon/apple.png"
          alt="Apple Logo"
          class="h-[16px] w-[16px]"
        />
        <span>Apple</span>
      </DropdownMenuItemLink>
      <DropdownMenuItemLink
        href="https://outlook.live.com/calendar/deeplink/compose/?rru=addevent&startdt=2025-06-07T16%3a00%3a00Z&enddt=2025-06-08T02%3a00%3a00Z&subject=Kids+Bday&location=Klosterweg+28+(Haus+K2)%2c+76131+Karlsruhe&body=Am+07.+Juni+2025+steigt+die+Geburtstagsparty+des+Jahres!+Halte+den+Termin+frei+und+sei+dabei!"
        target="_blank"
      >
        <NuxtImg
          src="/icon/outlook.png"
          alt="Outlook Logo"
          class="h-[16px] w-[16px]"
        />
        <span>Outlook</span>
      </DropdownMenuItemLink>
      <DropdownMenuItemLink href="/ical/kids_bday.ics">
        <CalendarDaysIcon class="h-[16px] w-[16px]" />
        <span>iCal&nbsp;{{ $t("common.file") }}</span>
      </DropdownMenuItemLink>
    </DropdownMenu>
  </Dropdown>
</template>

<script setup lang="ts">
import { CalendarDaysIcon } from "@heroicons/vue/16/solid";
</script>
