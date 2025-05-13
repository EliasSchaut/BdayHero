<template>
  <!-- hero -->
  <Sparkles>
    <section class="z-10 px-6 py-20 pb-16 text-center lg:py-32">
      <h1
        class="font-display text-second-900 dark:text-second-100 mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl"
      >
        <span>Save </span>
        <Underline>the DATE</Underline>
      </h1>
      <p
        class="text-second-700 dark:text-second-300 mx-auto mt-6 max-w-2xl text-lg tracking-tight"
      >
        <span>{{ $t("home.hero.1") }}</span>
        <Accent>{{ $t("home.hero.date") }}</Accent>
        <span>{{ $t("home.hero.2") }}</span>
        <Typewriter
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
            $t('home.typewriter.suffix.13'),
          ]"
        />
        <br />
        <span>{{ $t("home.hero.3") }}</span>
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <DropdownCalendar />
        <ButtonArrow href="#community">{{
          $t("home.hero.join_community")
        }}</ButtonArrow>
      </div>
    </section>
  </Sparkles>

  <!-- features -->
  <NuxtLayout name="grid" id="features">
    <LayoutHeadingTag class="pt-40">Features</LayoutHeadingTag>
    <LayoutHeadingGradient>{{ $t("home.tabs.title") }}</LayoutHeadingGradient>
    <Tabs>
      <TabsItem :title="$t('home.tabs.featured.title')">
        <Card3d
          :title="$t('home.tabs.featured.karaoke.title')"
          :subtitle="$t('home.tabs.featured.karaoke.subtitle')"
          image_src="/img/karaoke.jpg"
        />
        <Card3d
          :title="$t('home.tabs.featured.dj.title')"
          :subtitle="$t('home.tabs.featured.dj.subtitle')"
          image_src="/img/dj_paul.jpg"
        />
        <Card3d
          :title="$t('home.tabs.featured.team.title')"
          :subtitle="$t('home.tabs.featured.team.subtitle')"
          image_src="/img/fight.jpg"
        />
        <Card3d
          :title="$t('home.tabs.featured.meta.title')"
          :subtitle="$t('home.tabs.featured.meta.subtitle')"
          image_src="/img/meta.jpg"
        />
        <Card3d
          :title="$t('home.tabs.featured.photobox.title')"
          :subtitle="$t('home.tabs.featured.photobox.subtitle')"
          image_src="/img/photobox.jpg"
        />
        <Card3d
          :title="$t('home.tabs.featured.art.title')"
          :subtitle="$t('home.tabs.featured.art.subtitle')"
          image_src="/img/art.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.events.title')">
        <Card3d
          :title="$t('home.tabs.featured.speed_friending.title')"
          :subtitle="$t('home.tabs.featured.speed_friending.subtitle')"
          image_src="/img/speed_friending.jpg"
        />
        <Card3d
          :title="$t('home.tabs.events.kahoot.title')"
          :subtitle="$t('home.tabs.events.kahoot.subtitle')"
          image_src="/img/kahoot.jpg"
        />
        <Card3d
          :title="$t('home.tabs.events.olympia.title')"
          :subtitle="$t('home.tabs.events.olympia.subtitle')"
          image_src="/img/olympia.jpg"
        />
        <Card3d
          :title="$t('home.tabs.events.pool.title')"
          :subtitle="$t('home.tabs.events.pool.subtitle')"
          image_src="/img/billard.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.game.title')">
        <Card3d
          :title="$t('home.tabs.game.corner.title')"
          :subtitle="$t('home.tabs.game.corner.subtitle')"
          image_src="/img/gaming_ecke.jpg"
        />
        <Card3d
          :title="$t('home.tabs.game.outdoor.title')"
          :subtitle="$t('home.tabs.game.outdoor.subtitle')"
          image_src="/img/outdoor_games.jpg"
        />
        <Card3d
          :title="$t('home.tabs.game.indoor.title')"
          :subtitle="$t('home.tabs.game.indoor.subtitle')"
          image_src="/img/indoor_games.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.drinks.title')">
        <Card3d
          :title="$t('home.tabs.drinks.cocktails.title')"
          :subtitle="$t('home.tabs.drinks.cocktails.subtitle')"
          image_src="/img/cocktails.jpg"
        />
        <Card3d
          :title="$t('home.tabs.drinks.soft.title')"
          :subtitle="$t('home.tabs.drinks.soft.subtitle')"
          image_src="/img/softdrinks.jpg"
        />
        <Card3d
          :title="$t('home.tabs.drinks.beer.title')"
          :subtitle="$t('home.tabs.drinks.beer.subtitle')"
          image_src="/img/zapfe.jpg"
        />
      </TabsItem>
      <TabsItem :title="$t('home.tabs.food.title')">
        <Card3d
          :title="$t('home.tabs.food.grill.title')"
          :subtitle="$t('home.tabs.food.grill.subtitle')"
          image_src="/img/grill.jpg"
        />
        <Card3d
          :title="$t('home.tabs.food.finger_food.title')"
          :subtitle="$t('home.tabs.food.finger_food.subtitle')"
          image_src="/img/fingerfood.jpg"
        />
        <Card3d
          :title="$t('home.tabs.food.ice.title')"
          :subtitle="$t('home.tabs.food.ice.subtitle')"
          image_src="/img/eis.jpg"
        />
      </TabsItem>
    </Tabs>
  </NuxtLayout>

  <!-- testimonials -->
  <LayoutSection>
    <LayoutHeadingTag>{{ $t("home.testimonials.tag") }}</LayoutHeadingTag>
    <LayoutHeadingGradient
      >{{ $t("home.testimonials.title") }}
    </LayoutHeadingGradient>
    <TestimonialGrid>
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.cite"
        class="pt-8 sm:inline-block sm:w-full sm:px-4"
      >
        <Testimonial
          :cite="testimonial.cite"
          :author_name="testimonial?.author?.name"
          :author_handle="testimonial?.author?.handle"
          :author_avatar_url="testimonial?.author?.avatar_url"
        />
      </div>
    </TestimonialGrid>
  </LayoutSection>

  <!-- blog -->
  <NuxtLayout name="dots" id="blog">
    <LayoutHeadingTag class="pt-40">{{ $t("home.blog.tag") }}</LayoutHeadingTag>
    <LayoutHeadingGradient>{{ $t("home.blog.title") }}</LayoutHeadingGradient>
    <ArticleOverview
      :title="$t('home.blog.title')"
      :articles="[
        {
          title: 'Bday 24',
          desc: $t('home.blog.bday24.desc'),
          href: 'https://schaut.dev/articles/bday24',
          date: `${$t('home.blog.date')} 2024`,
        },
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

  <!-- get notified -->
  <section id="community" class="py-16 sm:py-24">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div
        class="bg-second-950 dark:bg-second-900 relative isolate overflow-hidden px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"
      >
        <h2
          class="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          {{ $t("home.community.head") }}
        </h2>
        <p class="text-second-300 mx-auto mt-6 max-w-lg text-center text-lg">
          {{ $t("home.community.content") }}
        </p>
        <a
          class="text-second-900 hover:bg-second-100 xs:w-fit mx-auto mt-10 flex w-min items-center justify-center gap-x-2 rounded-md bg-white px-12 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          type="button"
          href="https://chat.whatsapp.com/HF1UyLxp5Yc33L8s5rHFGi"
          target="_blank"
        >
          <img
            src="/svg/whatsapp.svg"
            height="20"
            width="20"
            alt="WhatsApp Logo"
          />
          <span>{{ $t("home.community.join") }}</span>
        </a>
        <svg
          viewBox="0 0 1024 1024"
          class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fill-opacity="0.7"
          />
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials: Array<{
  cite: string;
  author?: {
    name?: string;
    handle?: string;
    avatar_url?: string;
  };
}> = [
  {
    cite: "Ein Vierteljahrhundert mit Elias ist ein aufregendes Abenteuer voller Lachen, guter Laune und unvergesslicher Momente, die das Leben bunt und lebendig machen. - Dies gilt nicht nur für seine Geburtstagsfeiern!",
    author: {
      name: "Carmen Schaut",
      handle: "Familie",
      avatar_url: "/img/testimonials/carmen_schaut.jpg",
    },
  },
  {
    cite: "Wenn Elias so viel Aufwand in sein Studium stecken würde, wie er in seine Geburtstagsfeiern steckt, hätte er schon längst einen Doktor.",
    author: {
      name: "Niklas Kniep",
      handle: "Lila Pause",
      avatar_url: "/img/testimonials/niklas_kniep.jpg",
    },
  },
  {
    cite: "Elias' Geburtstag ist nicht irgendein Geburtstag. Livemusik, Geschicklichkeitsspiele, geheime Missionen, kollaborative kreative Projekte, aber natürlich auch Grillen und Getränke in der Bar machen machen den Tag zu einem besonderen Wiedertreffen für alle, die sich Freunde und Verwandte von Elias nennen dürfen.",
    author: {
      name: "Valentin Quapil",
      handle: "KIT",
      avatar_url: "/img/testimonials/valentin_quapil.jpg",
    },
  },
  {
    cite: "Wer Elias nicht kennt und seine Geburtstage, hat echt was im Leben verpasst!",
    author: {
      name: "Sean Ireland",
      handle: "Mannheim",
      avatar_url: "/img/testimonials/sean_ireland.jpg",
    },
  },
  {
    cite: "Letztes Jahr konnte ich hautnah erleben wie viel Liebe und Energie Elias in seinen Geburtstag steckt. Dieser Tag ist für ihn sehr besonders und deshalb versucht er sein Bestes zu geben, dass es für jeden einzelnen ein unvergessliches Event wird",
    author: {
      name: "Laura Blechschmidt",
      handle: "Freundin",
      avatar_url: "/img/testimonials/laura_blechschmidt.jpg",
    },
  },
  {
    cite: "Wer braucht Tinder, wenn man bei Elias Geburtstag heiße Singles aus der Umgebung von Mannheim kennenlernen kann?",
    author: {
      handle: "Lila Pause",
    },
  },
];
</script>
