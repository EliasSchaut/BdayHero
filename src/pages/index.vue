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
    <Tabs>
      <TabsItem title="Party">
        <Card
          title="Karaoke"
          subtitle="Lass deine Stimmbänder vibrieren und singe deine Lieblingslieder mit fast 10.000 verfügbaren Songs"
          image_src=""
        />
        <Card title="DJ Floor" subtitle="Blubb" image_src="" />
        <Card title="Mannschaftskampf" subtitle="Blubb" image_src="" />
        <Card title="Party Spiele" subtitle="Bierpong/Rage-Cage" image_src="" />
      </TabsItem>
      <TabsItem title="Game">
        <Card
          title="Kahoot"
          subtitle="Wissenswertes und Lustiges über Elias"
          image_src=""
        />
        <Card
          title="O-Lympia"
          subtitle="Bierkastenlauf, Pantomime,Eierlauf"
          image_src=""
        />
        <Card
          title="Billard-Turnier"
          subtitle="+ Freies Spiel die ganze Nacht"
          image_src=""
        />
        <Card
          title="Gaming-Ecke"
          subtitle="Switch, Steamdeck,Brettspiele"
          image_src=""
        />
        <Card
          title="Outdoor-Spiele"
          subtitle="Slackline, Wikingerschach, Frisbee, Pompfen"
          image_src=""
        />
      </TabsItem>
      <TabsItem title="Nerd">
        <Card title="Secret Meta-Game" subtitle="" image_src="" />
        <Card title="Speed-Friending" subtitle="" image_src="" />
        <Card title="Kunst-Ecke" subtitle="" image_src="" />
        <Card title="Stand-Up-Commedy" subtitle="Vllt lol" image_src="" />
      </TabsItem>
      <TabsItem title="Drinks">
        <Card title="Cocktails" subtitle="auch alkoholfrei" image_src="" />
        <Card title="Gezapftes Bier" subtitle="" image_src="" />
      </TabsItem>
      <TabsItem title="Food">
        <Card title="Grill" subtitle="" image_src="" />
        <Card title="Fingerfood" subtitle="Salat/Kuchen/Snacks" image_src="" />
        <Card title="Eis" subtitle="" image_src="" />
      </TabsItem>
    </Tabs>
  </NuxtLayout>
  <Testimonials
    :cards="[
      {
        title: 'Lila Pause',
        content: 'Ich hatte den Spaß meines Lebens und so',
        name: 'Elias Schaut',
      },
      { title: 'Fraktion', content: 'Beschreibung', name: 'Name' },
      {
        title: 'Lila Pause',
        content: 'Ich hatte den Spaß meines Lebens und so',
        name: 'Elias Schaut',
      },
      { title: 'Fraktion', content: 'Beschreibung', name: 'Name' },
    ]"
    heading="Das sagen die Gäste"
    pause_on_hover
  />
  <NuxtLayout name="dots">
    <Articles
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
      <h1
        class="relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center font-sans text-lg font-bold text-transparent md:text-7xl"
      >
        Get notified
      </h1>
      <p></p>
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
  </div>
  <form
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
  </form>
</template>
<script setup lang="ts"></script>
