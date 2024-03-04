<template>
  <Sparkles title="Kids Bday" />
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
</template>
<script setup lang="ts"></script>
