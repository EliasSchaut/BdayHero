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
    title="Kids Bday"
    :subtitle="$t('common.bday.date')"
    :button_label="$t('common.join_now')"
    button_link="/sign_up"
  />
  <Typewriter
    :heading="$t('home.typewriter.prefix')"
    :strings="[
      $t('home.typewriter.suffix.0'),
      $t('home.typewriter.suffix.1'),
      $t('home.typewriter.suffix.2'),
      $t('home.typewriter.suffix.3'),
      $t('home.typewriter.suffix.4'),
      $t('home.typewriter.suffix.5'),
      $t('home.typewriter.suffix.6'),
      $t('home.typewriter.suffix.7'),
      $t('home.typewriter.suffix.8'),
      $t('home.typewriter.suffix.9'),
      $t('home.typewriter.suffix.10'),
      $t('home.typewriter.suffix.11'),
      $t('home.typewriter.suffix.12'),
    ]"
  />
  <Lamp>
    <Media src="/vid/Bday24.mp4" />
  </Lamp>
  <NuxtLayout name="grid">
    <LayoutHeading class="relative top-32"
      >{{ $t('home.tabs.title') }}
    </LayoutHeading>
    <Tabs>
      <TabsItem :title="$t('home.tabs.featured.title')">
        <Card
          :title="$t('home.tabs.featured.karaoke.title')"
          :subtitle="$t('home.tabs.featured.karaoke.subtitle')"
          image_src="/img/karaoke.jpg"
        />
        <Card
          :title="$t('home.tabs.featured.dj.title')"
          :subtitle="$t('home.tabs.featured.dj.subtitle')"
          image_src="/img/dj_paul.jpg"
        />
        <Card
          :title="$t('home.tabs.featured.team.title')"
          :subtitle="$t('home.tabs.featured.team.subtitle')"
          image_src="/img/fight.jpg"
        />
        <Card
          :title="$t('home.tabs.featured.meta.title')"
          :subtitle="$t('home.tabs.featured.meta.subtitle')"
          image_src="/img/meta.jpg"
        />
        <Card
          :title="$t('home.tabs.featured.speed_friending.title')"
          :subtitle="$t('home.tabs.featured.speed_friending.subtitle')"
          image_src="/img/speed_friending.jpg"
        />
        <Card
          :title="$t('home.tabs.featured.art.title')"
          :subtitle="$t('home.tabs.featured.art.subtitle')"
          image_src="/img/art.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.events.title')">
        <Card
          :title="$t('home.tabs.events.kahoot.title')"
          :subtitle="$t('home.tabs.events.kahoot.subtitle')"
          image_src="/img/kahoot.jpg"
        />
        <Card
          :title="$t('home.tabs.events.olympia.title')"
          :subtitle="$t('home.tabs.events.olympia.subtitle')"
          image_src="/img/olympia.jpg"
        />
        <Card
          :title="$t('home.tabs.events.pool.title')"
          :subtitle="$t('home.tabs.events.pool.subtitle')"
          image_src="/img/billard.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.game.title')">
        <Card
          :title="$t('home.tabs.game.corner.title')"
          :subtitle="$t('home.tabs.game.corner.subtitle')"
          image_src="/img/gaming_ecke.jpg"
        />
        <Card
          :title="$t('home.tabs.game.outdoor.title')"
          :subtitle="$t('home.tabs.game.outdoor.subtitle')"
          image_src="/img/outdoor_games.jpg"
        />
        <Card
          :title="$t('home.tabs.game.indoor.title')"
          :subtitle="$t('home.tabs.game.indoor.subtitle')"
          image_src="/img/indoor_games.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.drinks.title')">
        <Card
          :title="$t('home.tabs.drinks.cocktails.title')"
          :subtitle="$t('home.tabs.drinks.cocktails.subtitle')"
          image_src="/img/cocktails.jpg"
        />
        <Card
          :title="$t('home.tabs.drinks.beer.title')"
          :subtitle="$t('home.tabs.drinks.beer.subtitle')"
          image_src="/img/zapfe.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.food.title')">
        <Card
          :title="$t('home.tabs.food.grill.title')"
          :subtitle="$t('home.tabs.food.grill.subtitle')"
          image_src="/img/grill.jpg"
        />
        <Card
          :title="$t('home.tabs.food.finger_food.title')"
          :subtitle="$t('home.tabs.food.finger_food.subtitle')"
          image_src="/img/fingerfood.jpg"
        />
        <Card
          :title="$t('home.tabs.food.ice.title')"
          :subtitle="$t('home.tabs.food.ice.subtitle')"
          image_src="/img/eis.jpg"
        />
      </TabsItem>
    </Tabs>
  </NuxtLayout>
  <Testimonials
    :heading="$t('home.testimonials.title')"
    speed="40s"
    :cards="[
      {
        title: 'Lila Pause',
        content: 'Den Abend konnte man gut Blau und Lila genießen',
        name: 'Anonym',
      },
      {
        title: 'ThaiFreitagsTreff',
        content:
          'Wer Elias nicht kennt und seine Geburtstage, hat echt was im Leben verpasst!',
        name: 'Sean',
      },
      {
        title: 'Lila Pause',
        content: 'Ich würde meinen eigenen Vater verkaufen für eine Einladung',
        name: 'Kaan',
      },
      {
        title: 'Lila Pause',
        content:
          'Jedes Jahr wird mir erzählt wie geil Elias Geburtstag war und was ich alles verpasst habe. Dieses Jahr habe ich mir sicherheitshalber direkt am Anfang des Jahres diesen besonderen Tag geblockt, dass ja nichts dazwischen kommt.',
        name: 'Laura',
      },
      {
        title: 'Gegen-Party wo anders',
        content:
          'Von so einem durchorganisierten Fest kann jeder Veranstaltungsplaner nur träumen. Ihr fragt euch, ob hier all eure Träume erfüllt werden? Ja, das werden sie!',
        name: 'Anderer Veranstalter',
      },
      {
        title: 'Lila Pause',
        content:
          'Ein ausgewogener Mix an Menschen, Events und Drinks. Hier ist für jeden was dabei.',
        name: 'Anonym',
      },
      {
        title: 'Lila Pause',
        content:
          'Wenn Elias so viel Aufwand in sein Studium stecken würde, wie er in seine Geburtstagsfeiern steckt, hätte er schon längst einen Doktor.',
        name: 'Niklas',
      },
      {
        title: 'Lila Pause',
        content: 'Ooooooooh Elias du bist so geil',
        name: 'Anonym',
      },
      {
        title: 'Lila Pause',
        content: 'Wichtig und richtig so.',
        name: 'Anonym',
      },
      {
        title: 'Youtube',
        content:
          'Elias Geburtstag ist das Event des Jahres. Wer weiß das? Wieder keiner.',
        name: 'Axel Stoll',
      },
      {
        title: 'Tinder',
        content:
          'Der Bierpongtisch, eine unendliche Bierquelle. Leute, das müsst ihr verinnerlichen!',
        name: 'Axel Stramm',
      },
      {
        title: 'Lila Pause',
        content:
          'Ich sehe JP sonst nie. Wobei neulich habe ich ihn getroffen aber wir haben nicht geredet',
        name: 'Anna',
      },
      {
        title: 'Lila Pause',
        content: 'Toller Abend, jemanden abschleppen war aber schwer...',
        name: 'Mitglied der DDR-Lesbengruppe \'Lila Pause\'',
      },
      {
        title: 'Lila Pause',
        content:
          'Wer braucht Tinder, wenn man bei Elias Geburtstag heiße Singles aus der Umgebung von Mannheim kennenlernen kann?',
        name: 'Anonym',
      },
      { title: 'Lila Pause', content: 'Für Fortnite', name: 'Anonym' },
      {
        title: 'HaDiKo',
        content: 'Beste Party zu der ich nicht eingeladen war\n',
        name: 'Anonym',
      },
      { title: 'Umwege', content: '10 von 10', name: 'Ein Medizinstudent' },
      {
        title: 'Lila Pause',
        content: 'DAS (andere) Fest',
        name: 'Anonym',
      },
      {
        title: 'Lila Pause',
        content: 'Wo Saufen eine Ehre ist, darf Kotzen keine Schande sein',
        name: 'Der echte Thilo',
      },
    ]"
    pause_on_hover
  />
  <NuxtLayout name="dots">
    <ArticleOverview
      :title="$t('home.blog.title')"
      :articles="[
        {
          title: 'Bday 23',
          desc: $t('home.blog.bday23.desc'),
          href: 'https://schaut.dev/articles/bday23',
          date: `${$t('home.blog.date')} 2023`,
        },
        {
          title: 'Bday 22',
          desc: $t('home.blog.bday22.desc'),
          href: 'https://schaut.dev/articles/bday22',
          date: `${$t('home.blog.date')} 2022`,
        },
        {
          title: 'Bday 21',
          desc: $t('home.blog.bday21.desc'),
          href: 'https://schaut.dev/articles/bday21',
          date: `${$t('home.blog.date')} 2021`,
        },
      ]"
    />
  </NuxtLayout>

  <div
    class="relative flex h-[40rem] w-full flex-col items-center justify-center rounded-md bg-white antialiased dark:bg-black"
  >
    <LayoutNewsletter id="newsletter" class="z-10" />
    <SparklesBeams />
    <LayoutFooter class="relative top-32" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'slim',
});
</script>
