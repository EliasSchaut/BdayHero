<template>
  <Sparkles title="Kids Bday" subtitle="08. Juni 2024" />
  <Typewriter
    heading="Ein Geburtstag"
    :strings="[
      'mit bester Laune',
      'perfekt organisiert',
      'mit maximalem Spaß',
      'voller Überraschungen',
      'mit all deinen Freunden',
      'zum Erinnern & Erzählen',
      'mit Elias\' Fliege',
      'für jeden gemacht',
      'mit cooler Location',
      'zum Anfreunden & Verlieben',
      'mit kreativer Unterhaltung',
      'mit leckerem Essen & Trinken',
      'für dich',
    ]"
  />
  <Lamp>
    <Media />
  </Lamp>
  <NuxtLayout name="grid">
    <LayoutHeading class="relative top-24">Das erwartet dich</LayoutHeading>
    <Tabs>
      <TabsItem title="Featured">
        <Card
          title="Karaoke"
          subtitle="Singe deine Lieblingssongs"
          image_src="/img/karaoke.jpg"
        />
        <Card
          title="DJ Floor"
          subtitle="Tanze mit @paulstr die ganze Nacht"
          image_src="/img/dj_paul.jpg"
        />
        <Card
          title="Mannschaftskampf"
          subtitle="Setze, Kämpfe und Gewinne"
          image_src="/img/fight.jpg"
        />
        <Card
          title="Secret Meta-Game"
          subtitle="Eine Schnitzeljagd für Rätzelliebende"
          image_src="/img/meta.jpg"
        />
        <Card
          title="Speed-Friending"
          subtitle="Schnell und einfach anfreunden"
          image_src="/img/speed_friending.jpg"
        />
        <Card
          title="Kunst-Ecke"
          subtitle="Hinterlasse deine Persönlichkeit"
          image_src="/img/art.jpg"
        />
      </TabsItem>
      <TabsItem title="Events">
        <Card
          title="Kahoot"
          subtitle="Wissenswertes und Lustiges über Elias"
          image_src="/img/kahoot.jpg"
        />
        <Card
          title="O-Lympia"
          subtitle="Bierkastenlauf/Pantomime/Eierlauf"
          image_src="/img/olympia.jpg"
        />
        <Card
          title="Billard-Turnier"
          subtitle="+ Freies Spiel die ganze Nacht"
          image_src="/img/billard.jpg"
        />
        <Card
          title="Stand-Up-Commedy"
          subtitle="Vllt lol"
          image_src="/img/stand_up.jpg"
        />
      </TabsItem>
      <TabsItem title="Game">
        <Card
          title="Gaming-Ecke"
          subtitle="MarioKart/SmashBros/Unrailed!/etc."
          image_src="/img/gaming_ecke.jpg"
        />
        <Card
          title="Outdoor-Spiele"
          subtitle="Slackline/Wikingerschach/Frisbee/usw."
          image_src="/img/outdoor_games.jpg"
        />
        <Card
          title="Indoor-Spiele"
          subtitle="Brettspiele/Karten/Rollenspiele/usw."
          image_src="/img/indoor_games.jpg"
        />
      </TabsItem>
      <TabsItem title="Drinks">
        <Card
          title="Cocktails"
          subtitle="Auch alkoholfrei"
          image_src="/img/cocktails.jpg"
        />
        <Card
          title="Gezapftes Bier"
          subtitle="Frisch vom Fass"
          image_src="/img/zapfe.jpg"
        />
      </TabsItem>
      <TabsItem title="Food">
        <Card
          title="Grill"
          subtitle="Frisches vom Grill"
          image_src="/img/grill.jpg"
        />
        <Card
          title="Fingerfood"
          subtitle="Salat/Kuchen/Snacks"
          image_src="/img/fingerfood.jpg"
        />
        <Card
          title="Eis"
          subtitle="Für den süßen Abgang"
          image_src="/img/eis.jpg"
        />
      </TabsItem>
    </Tabs>
  </NuxtLayout>
  <Testimonials
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
    heading="Das sagen die Gäste"
    pause_on_hover
  />
  <NuxtLayout name="dots">
    <ArticleOverview
      :articles="[
        {
          title: 'Bday 23',
          desc: 'Thinks and thoughts about my Bday 23.',
          href: 'https://schaut.dev/articles/bday23',
          date: '04. Juni 2023',
        },
        {
          title: 'Bday 22',
          desc: 'Thinks and thoughts about my Bday 22.',
          href: 'https://schaut.dev/articles/bday22',
          date: '04. Juni 2022',
        },
        {
          title: 'Bday 21',
          desc: 'Thinks and thoughts about my Bday 21.',
          href: 'https://schaut.dev/articles/bday21',
          date: '04. Juni 2021',
        },
      ]"
    />
  </NuxtLayout>
  <div
    class="relative flex h-[40rem] w-full flex-col items-center justify-center rounded-md bg-black antialiased"
  >
    <div class="mx-auto max-w-2xl p-4">
      <LayoutHeading class="relative text-center text-2xl md:text-7xl">
        Get notified
      </LayoutHeading>
      <p
        class="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500"
      >
        Get notified when the next Bday24 Infos are coming up.
      </p>
      <form>
        <input
          type="email"
          placeholder="max@mustermann"
          class="relative z-10 mt-4 w-full rounded-lg border border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-teal-500"
          required
        />
      </form>
    </div>
    <SparklesBeams />
    <LayoutFooter class="relative top-32" />
  </div>
  <!--<form
    class="hidden text-white"
    action="https://ml.kundenserver.de/cgi-bin/mailinglist.cgi"
    method="POST"
    target="_blank"
  >
    <input checked name="subscribe_r" type="radio" value="subscribe" />
    Ja, ich möchte mich auf die Mailingliste bday@schaut.dev.
    <br />
    <input name="subscribe_r" type="radio" value="unsubscribe" />
    Bitte streichen Sie mich wieder von der Mailingliste bday@schaut.dev.
    <br />
    Geben Sie Ihre E-Mail-Adresse ein:
    <br />
    <input maxlength="51" name="mailaccount_r" size="51" type="text" />
    <br />
    Wiederholen Sie die eingegebene E-Mail-Adresse:
    <br />
    <input maxlength="51" name="mailaccount2_r" size="51" type="text" />
    <br />
    <input type="SUBMIT" value="Absenden" />
    <br />
    <input type="RESET" value="Zurücksetzen" />
    <hr />
    <input name="FBMLNAME" type="hidden" value="bday@schaut.dev" />
    <br />
    <input name="FBLANG" type="hidden" value="de" />
  </form>-->
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'slim',
});
</script>
