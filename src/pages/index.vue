<template>
  <Sparkles title="Kids Bday" subtitle="08. Juni 2024" />
  <Typewriter
    heading="Ein Geburtstag voller"
    :strings="['Spaß', 'Freude', 'Überraschung']"
  />
  <Lamp>
    <Media />
  </Lamp>
  <NuxtLayout name="grid">
    <Tabs
      :tabs="[
        {
          title: 'Party',
          content: `Party`,
        },
        {
          title: 'Nerd',
          content: `Nerd`,
        },
        {
          title: 'Game',
          content: `Game`,
        },
        {
          title: 'Drinks',
          content: `Drinks`,
        },
        {
          title: 'Food',
          content: `Food`,
        },
      ]"
    />
  </NuxtLayout>
  <CardsMoving
    :cards="[
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
      { title: 'Blubb', content: 'asidfh', name: 'alkdjhf' },
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
</template>
