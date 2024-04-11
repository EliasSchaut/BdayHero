<template>
  <div
    class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
  >
    <div class="absolute inset-0 h-screen w-full">
      <SparklesCore
        background="transparent"
        :minSize="0.6"
        :maxSize="1.4"
        :particleDensity="100"
        class="h-full w-full"
        particleColor="#FFFFFF"
      />
    </div>
    <h1
      class="relative z-20 text-center text-5xl font-bold text-white md:text-7xl lg:text-6xl"
      v-motion-fade
    >
      {{ title }}
    </h1>
    <h2
      v-motion
      v-if="subtitle.length !== 0"
      class="mt-20 text-3xl font-bold text-white opacity-0 md:text-5xl"
      :initial="{
        opacity: 0,
      }"
      :enter="{
        opacity: 1,
        transition: {
          delay: 1500,
        },
      }"
    >
      {{ subtitle }}
    </h2>
    <nuxt-link
      :href="button_link"
      v-motion
      type="button"
      class="mt-20 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      :initial="{
        opacity: 0,
        y: 0,
      }"
      :enter="{
        opacity: 1,
        y: -10,
        transition: {
          delay: 3000,
        },
      }"
    >
      {{ button_label }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  button_label: {
    type: String,
    default: 'JOIN NOW!',
  },
  button_link: {
    type: String,
    default: '/',
  },
});
</script>
