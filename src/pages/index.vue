<template>
  <Sparkles title="Kids Bday" />
  <Typewriter
    heading="Ein Geburtstag voller"
    :strings="['Spaß', 'Freude', 'Überraschung']"
  />
  <Lamp>
    <video
      class="relative w-[20rem] rounded-md shadow-2xl sm:top-16 sm:w-[30rem]"
      src="/bday.mp4"
      controls
    />
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
          title: 'Family',
          content: `Family`,
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
</template>
