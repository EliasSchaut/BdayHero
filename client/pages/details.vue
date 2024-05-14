<template>
  <ListDescription
    title="Details"
    subtitle="Alles Wissenswerte rund um den Bday"
  >
    <ListDescriptionElement title="Beginn"
      >Sa. 08.06.24 - 19 Uhr (18:30 Uhr Einlass)
    </ListDescriptionElement>
    <ListDescriptionElement title="Ort"
      ><span>Klosterweg 28, Haus K2 Keller (K2-Bar) - 76131 Karlsruhe</span>
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
    <ListDescriptionElement title="Anreise">
      <ul>
        <li>
          Auto/Motorrad: Freies Parken auf dem ganzen Klosterweg
          <LinkUnderlined
            value="Fahrgemeinschaften Börse"
            href="https://chat.whatsapp.com/Ei50VQfokLnLWbKz1Ygi5a"
          />
        </li>
        <li>
          Öffentlich:
          <LinkUnderlined
            value="Vom&nbsp;Hauptbahnhof"
            href="https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_origin=Karlsruhe%2C+Karlsruhe+Hauptbahnhof&name_destination=Karlsruhe%2C+Klosterweg+28&nameInfo_origin=7000090%3A%2409&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=08.06.2024&itdTime=19%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=10&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]"
          />
          <LinkUnderlined
            value="Von&nbsp;Hagsfeld&nbsp;Bahnhof"
            href="https://www.kvv.de/fahrplan/fahrplanauskunft.html?itdLPxx_formAction=%2Ffahrplan%2Ffahrplanauskunft.html&language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=trip&itdLPxx_contractor=&std3_contractorMacro=&useRealtime=1&name_origin=Hagsfeld%2C+Hagsfeld+Bahnhof&name_destination=Karlsruhe%2C+Klosterweg+28&nameInfo_origin=7003102&type_origin=any&nameInfo_destination=streetID%3A1500000943%3A28%3A8212000%3A15%3AKlosterweg%3AKarlsruhe%3AKlosterweg%3A%3AKlosterweg%3A76131%3AANY%3ADIVA_SINGLEHOUSE%3A937541%3A5721815%3AMRCV%3AB_W%3A0&type_destination=any&itdDateDayMonthYear=08.06.2024&itdTime=19%3A00&itdTripDateTimeDepArr=arr&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&std3_inclMOT_0Macro=true&std3_inclMOT_1Macro=true&std3_inclMOT_4Macro=true&std3_inclMOT_5Macro=true&routeType=LEASTTIME&trITMOTvalue100=10&maxChanges=9&imparedOptionsActive=1&name_via=&nameInfo_via=invalid&type_via=any&dwellTimeMinutes=&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]"
          />
        </li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement title="Programm">
      <ul>
        <li>18:30 - Einlass</li>
        <li>19:00 - Offizieller Beginn</li>
        <li>19:30 - Begrüßung</li>
        <li>19:45 - Speed-Friending</li>
        <li>20:30 - Olympia</li>
        <li>21:30 - Billardturnier</li>
        <li>23:00 - Kahoot!</li>
        <li>01:00 - Auflösung Mannschaftskampf + Rede</li>
        <li>02:00 - Eröffnung Diskothek</li>
        <li>Danach - OpenEnd</li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement title="Verpflegung">
      Für Essen und Trinken ist gesorgt! Es gibt Grillgut
      (vegan/vegetarisch/fleisch), Salate, Kuchen, alkoholische und alkoholfreie
      Cocktails und Bier vom Fass.
    </ListDescriptionElement>
  </ListDescription>
  <HeadingItalic class="my-10" title="FAQ" />
  <Faq :faqs="faqs" class="rounded-2xl" />
</template>

<script setup lang="ts">
const faqs = [
  {
    question: 'Was kann ich mitbringen',
    answer:
      'Sehr gerne kannst du Essen mitbringen. Grillgut, Salate und Kuchen sind sehr gerne gesehen. Getränketechnisch ist alles vorhanden. Wenn du ein interessantes Spiel oder ähnliches hast, kannst du das auch gerne mitbringen!',
  },
  {
    question: 'Was kann ich dir schenken?',
    answer:
      'Deine Anwesenheit ist das größte Geschenk! Wenn du trotzdem etwas schenken möchtest, freue ich mich über eine kleine <a class="underline" href="https://donate.schaut.dev">Spende</a> für die Getränke und das Essen. Ich freue natürlich trotzdem über kreative Geschenke :D',
  },
  {
    question: 'Kann man übernachten?',
    answer:
      'Es gibt leider nur sehr begrenzt Schlafplätze und auch nur für Menschen außerhalb von Karlsruhe. Wenn du einen Schlafplatz benötigst, gibt dies bei der Anmeldung an und tritt der <a class="underline" href="https://chat.whatsapp.com/CTAQ6wYi3HH3E3yHNvIFT1">Bettbörse</a> bei.',
  },
  {
    question: 'Kann ich ein Bett zum Übernachten anbieten?',
    answer:
      'Solange du innerhalb von Karlsruhe wohnst, ist das gerne möglich. Gib dies bei der Anmeldung an und tritt der <a class="underline" href="https://chat.whatsapp.com/CTAQ6wYi3HH3E3yHNvIFT1">Bettbörse</a> bei.',
  },
  {
    question: 'Kann man irgendwo planen, zusammen mit einem Auto anzureisen?',
    answer:
      'Ja, es gibt eine Gruppe dafür, in der du dich austauschen kannst: <a class="underline" href="https://chat.whatsapp.com/Ei50VQfokLnLWbKz1Ygi5a">Fahrgemeinschaften</a>',
  },
  {
    question: 'Wie funktioniert der Mannschaftskampf?',
    answer:
      'Jeder Gast erhält bei der Anmeldung eine Teamzugehörigkeit (Rot/Blau) und 5 Tokens. Jene können für verschiedene Aktionen gesetzt oder gewonnen werden. Je mehr ein Team Tokens anteilig zum Gegnerteam bei der Auflösung besitzt, desto mehr gewinnt das Team vom Preis.',
  },
  {
    question: 'Werde ich Spaß haben?',
    answer:
      'JA! Du wirst den besten Abend deines Lebens haben! Egal ob alt oder jung, groß oder klein, nerdy oder party, du wirst deinen Spaß haben!',
  },
];
</script>
