<template>
  <ListDescription
    :title="$t('detail.title')"
    :subtitle="$t('detail.subtitle')"
  >
    <ListDescriptionElement :title="$t('detail.begin.title')"
      >{{ $t('detail.begin.value') }}
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.location.title')"
      ><span>{{ $t('detail.location.value') }}</span>
      <LinkUnderlined
        value="GoogleMaps"
        href="https://maps.app.goo.gl/ARw5YZphkyWSiqEi8"
      />
      <LinkUnderlined
        value="Apple&nbsp;Karten"
        href="https://maps.apple.com/?address=Klosterweg%2030,%2076131%20Karlsruhe,%20Deutschland&auid=13013047162473329048&ll=49.020084,8.422487&lsp=9902&q=Hans%20Dickmann%20Kolleg%20-%20K2&t=m"
      />
      <LinkUnderlined
        value="OpenStreetMap"
        href="https://www.openstreetmap.org/?mlat=49.02014&mlon=8.42261#map=19/49.02014/8.42261&layers=N"
      />
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.theme.title')">
      {{ $t('detail.theme.value') }}
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.arrival.title')">
      <ul>
        <li>
          {{ $t('detail.arrival.value.car') }}
          <LinkUnderlined
            :value="$t('detail.arrival.value.car_sharing')"
            href="https://chat.whatsapp.com/Ei50VQfokLnLWbKz1Ygi5a"
          />
        </li>
        <li>
          {{ $t('detail.arrival.value.public') }}:
          <LinkUnderlined
            :value="$t('detail.arrival.value.public_central_station')"
            href="https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_origin=Karlsruhe%2C+Hauptbahnhof&name_destination=Karlsruhe%2C+Klosterweg+28&nameInfo_origin=7000090&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=07.06.2025&itdTime=18%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=15&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]"
          />
          <LinkUnderlined
            :value="$t('detail.arrival.value.public_hagsfeld')"
            href="https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_origin=Hagsfeld%2C+Hagsfeld+Bahnhof&name_destination=Karlsruhe%2C+Klosterweg+28&nameInfo_origin=7003102&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=07.06.2025&itdTime=18%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=15&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]"
          />
          <LinkUnderlined
            :value="$t('detail.arrival.value.public_durlach')"
            href="https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_origin=Durlach%2C+Durlach+Bahnhof&name_destination=Karlsruhe%2C+Klosterweg+28&nameInfo_origin=7000802%3A%2422&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=07.06.2025&itdTime=18%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=15&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]"
          />
        </li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.program.title')">
      <ul>
        <li v-for="i in 7" :key="i">
          {{ $t(`detail.program.value.${i - 1}`) }}
        </li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.catering.title')">
      {{ $t('detail.catering.value') }}
    </ListDescriptionElement>
  </ListDescription>

  <div class="mt-4 flex justify-center">
    <DropdownCalendar />
  </div>

  <HeadingItalic class="my-10" title="FAQ" />
  <Faq :faqs="faqs" class="rounded-2xl" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const faqs: ComputedRef<{ question: string; answer: string }[]> = computed(
  () => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        question: t(`detail.faq.${i}.title`),
        answer: t(`detail.faq.${i}.value`),
      });
    }
    return items;
  },
);
</script>
