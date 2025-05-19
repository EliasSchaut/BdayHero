<template>
  <nuxt-link
    :href="href"
    class="text-second-900 dark:text-second-100 text-sm/6 font-semibold"
  >
    <slot />
    <span aria-hidden="true">→</span></nuxt-link
  >
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
