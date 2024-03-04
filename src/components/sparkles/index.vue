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
      class="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl"
      v-motion-fade
    >
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
