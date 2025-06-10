<template>
  <Dropdown>
    <DropdownButton>
      <ButtonPrime>{{ $t("home.hero.add_to_calendar") }}</ButtonPrime>
    </DropdownButton>
    <DropdownMenu class="z-50">
      <DropdownMenuItemLink
        href="https://calendar.google.com/calendar/u/0/r/eventedit?&dates=20260606T180000/20260607T040000&ctz=Europe/Berlin&text=KidsBday26&location=Klosterweg+28+(Haus+K2),+76131+Karlsruhe&details=Am+06.+Juni+2026+steigt+die+Geburtstagsparty+des+Jahres!+Mehr+Infos+siehe+https://bday.schaut.dev"
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
        href="https://outlook.live.com/calendar/0/action/compose?rru=addevent&startdt=2026-06-06T16:00:00Z&enddt=2026-06-07T02:00:00Z&subject=KidsBday26&location=Klosterweg%2028%20(Haus%20K2)%2C%2076131%20Karlsruhe&body=Am%2006.%20Juni%202026%20steigt%20die%20Geburtstagsparty%20des%20Jahres!%20Mehr%20Infos%20siehe%20https%3A%2F%2Fbday.schaut.dev"
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
