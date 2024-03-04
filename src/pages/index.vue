<template>
  <Sparkles title="Kids Bday" />
  <Lamp>
    <video
      class="relative top-36 w-1/2 rounded-md shadow-2xl"
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
