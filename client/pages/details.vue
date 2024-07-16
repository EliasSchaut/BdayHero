<template>
  <ListDescription
    :title="$t('detail.title')"
    :subtitle="$t('detail.subtitle')"
  >
    <ListDescriptionElement :title="$t('detail.begin.title')"
      >Samstag, 05.10.2024 von 11:00 bzw. 15:30 Uhr bis open end
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.location.title')">
      <ul>
        <li><b>Dorfführung (11 Uhr)</b>: Neuleiningen, Kirchengasse 6</li>
        <li>
          <b>Weinprobe (14 Uhr)</b>: Grünstadt-Sausenheim, Bärenbrunnenstraße 15
        </li>
        <li>
          <b>Geburtstagsfeier (ab 15:30 Uhr)</b>: Grünstadt, Richard - Wagner –
          Straße 1
        </li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.arrival.title')">
      <ul>
        <li>
          <b>Über A61/A6</b>: Am Frankenthaler Kreuz auf die A6 Richtung
          Kaiserslautern fahren und die Abfahrt Grünstadt nehmen. Nach dem
          Bahnübergang und den Tankstellen von der Kirchheimerstraße aus links
          abbiegen in den Südring:
        </li>
        <li>
          <b>Zur Dorfführung in Neuleiningen</b>: Vom Südrinng aus Richtung
          Sausenheim fahren und von dort aus nach Neuleiningen. Parkmöglichkeit
          gibt es auf dem Berghohl, 67271 Neuleiningen.
        </li>
        <li>
          <b>Zur Weinprobe</b>: Richtung Neuleiningen/Sausenheim fahren, kurz
          vor dem Ortsausgang rechts in die Bärenbrunnenstraße abbiegen (Von
          Neuleiningen aus 1. Straße nach dem Ortseingang links!), Hausnummer 15
          auf der linken Seite, 67269 Grünstadt-Sausenheim.
        </li>
        <li>
          <b>Zur Geburtstagsfeier in der Richard-Wagner-Straße</b>: Vom Südring
          die 2. Querstraße links nehmen in die Philipp-Rüttger-Straße, dann
          links abbiegen in die Richard-Wagner-Straße, Hausnummer 1, 67269
          Grünstadt (Parkplätze befinden sich in der Mozartstraße, nach dem Haus
          rechts abbiegen).
        </li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.program.title')">
      <ul>
        <li>
          11:00 - Begrüßung und historische Ortsführung Neuleiningen mit Essen
        </li>
        <li>14:00 - Weinprobe im Weingut Gaul</li>
        <li>16:00 - Kennenlernspiel</li>
        <li>17:00 - Zeremonie zum Weltlehrer/-innentag</li>
        <li>19:30 - Quizshow „50 Jahre Carmen“</li>
        <li>20:00 - Bildershow „50 Jahre Carmen“</li>
        <li>21:30 - Party im Keller & Karaoke im Zelt</li>
        <li>danach - Open End</li>
      </ul>
    </ListDescriptionElement>
    <ListDescriptionElement :title="$t('detail.catering.title')">
      Für Essen und Trinken ist gesorgt! Es gibt Grillgut
      (vegan/vegetarisch/fleisch), Salate, Kuchen, alkoholische und alkoholfreie
      Getränke und erlesenen Wein.
    </ListDescriptionElement>
  </ListDescription>
  <div class="mt-10 flex justify-center">
    <ButtonGoto
      class="inline-block"
      button_label="Melde dich jetzt an!"
      button_link="/sign_up"
    />
  </div>

  <!--<HeadingItalic class="my-10" title="FAQ" />
  <Faq :faqs="faqs" class="rounded-2xl" />-->
</template>

<script setup lang="ts">
const { t } = useI18n();
const faqs: Array<{ question: string; answer: string }> = [];
for (let i = 0; i < 7; i++) {
  faqs.push({
    question: t(`detail.faq.${i}.title`),
    answer: t(`detail.faq.${i}.value`),
  });
}
</script>
