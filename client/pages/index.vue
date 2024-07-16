<template>
  <div id="nav-hero" class="flex items-center justify-center">
    <div
      class="absolute top-5 z-10 opacity-0"
      v-motion
      :initial="{
        opacity: 0,
        y: -10,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 3500,
        },
      }"
    >
      <LayoutNav mobile_only />
    </div>
  </div>
  <Sparkles
    title="50th Birthday  Carmen"
    subtitle="05. Oktober 2024"
    button_label="Lese die Details"
    button_link="/details"
  />
  <ImgText
    title="Liebe Familie, liebe Kolleg/-innen und Freunde,"
    img_src="/img/profile_carmen.png"
    img_rounded_full
  >
    ich freue mich sehr, Euch zu meinem 50. Geburtstag! einladen zu dürfen.
    Dieses Jahr wird es ein besonderes Fest, da wir gleich mehrere Anlässe
    feiern: Meinen Geburtstag, ein traditionelles Weinfest und den
    Weltlehrer/-innentag in meiner wiederentdeckten Heimat, die mit ihrem
    Charme, ihrer Geschichte und ihren Köstlichkeiten begeistert.
  </ImgText>

  <LayoutHeading>Programm</LayoutHeading>

  <ImgText title="Dorfführung mit Lunch" img_src="/img/Dorfführung.jpg" swapped>
    Wir beginnen wahlweise den Tag mit einer historischen Dorfführung durch das
    Burg- und Weindorf Neuleiningen - Heimat meiner väterlichen Groß- und
    Urgroßeltern. Die Dorfführung wird von meiner Grundschullehrerin der 1. und
    2. Klasse, Frau Hildegund Rixner, geleitet. Anschließend gibt es kostenfreie
    „Grumbeersupp“ im ehemaligen Bistro Backhaus in der Untergasse 24 bei Pavla
    Freyland. Treffpunkt ist um 11:00 Uhr vor dem „Museum an der Münze“ in der
    Kirchengasse 6.<br />
    <div class="mt-2 text-xs italic leading-tight">
      Für die Münzgruppe wird der Eintritt nur bei Vorlage der familiären Münze
      ;o) gewährt.
    </div>
  </ImgText>

  <ImgText title="Weinprobe" img_src="/svg/600x400.svg">
    Gemütlich geht es ab 14:00 Uhr mit einer Auswahl an erlesenen Weinen im
    Weingut Karl-Heinz Gaul in Sausenheim weiter. Frau Rosemarie Gaul, die das
    Weingut mit ihren Töchtern betreibt, war gut mit meinen Eltern befreundet.
    Im Anschluss daran kann ein Spaziergang über die Weinberge zum Haus nach
    Grünstadt gemacht werden. <br />
    <div class="mt-2 text-xs italic leading-tight">
      Dazu müssten zuvor untereinander Fahrgemeinschaften und die Teilnahme am
      Spaziergang geregelt sein.
    </div>
  </ImgText>

  <ImgText title="Geburtstagsfeier" img_src="/svg/600x400.svg" swapped>
    Natürlich darf auch die traditionelle Geburtstagsfeier nicht fehlen. Sie
    startet ab 15:30 Uhr im hauseigenen Garten. Es gibt Kaffee und Kuchen, viele
    weitere Leckereien und gute Gesellschaft zu elektronischer Musik.
  </ImgText>

  <ImgText title="Weltlehrer/-innentag" img_src="/svg/600x400.svg">
    Zu Ehren aller Lehrer/-innen unter uns werden wir eine kleine Zeremonie
    abhalten, in der wir die Bedeutung und den Einfluss von Lehrkräften
    würdigen. ;o)
    <div class="mt-2 text-xs italic leading-tight">
      (Info zum Gedenktag: „Der Weltlehrertag wird am 05. Oktober 2024 begangen,
      im Gedenken an die "Charta zum Status der Lehrerinnen und Lehrer", die
      1964 von der UNESCO und der Internationalen Arbeitsorganisation angenommen
      wurde. Bereits seit 1994 findet er jährlich statt.“ Dieser Text wurde von
      <nuxt-link to="https://www.kleiner-kalender.de" target="_blank" external
        >www.kleiner-kalender.de</nuxt-link
      >
      entnommen.)
    </div>
  </ImgText>

  <ImgText
    title="Weinfest mit Geburtstagsprogramm"
    img_src="/svg/600x400.svg"
    swapped
  >
    Am Abend gibt es Pfälzer Köstlichkeiten mit Ausschank und weitere
    Programmpunkte, u.a. ist eine Bilder- und Quizshow „≤ 50 Jahre Carmen“
    geplant.
  </ImgText>

  <ImgText title="Musik und Karaoke" img_src="/svg/600x400.svg">
    Den Abend lassen wir bei groovigen Rhythmen im Partykeller und Karaoke in
    den Zelten ausklingen. Dazu gibt es eine Playlist zur Songauswahl.
  </ImgText>

  <LayoutFooter class="my-6" />
</template>

<script setup lang="ts">
import ImgText from '~/components/layout/ImgText.vue';

definePageMeta({
  layout: 'slim',
});
</script>
