<template>
  <NuxtLink
    class="border-b-0 border-indigo-500 font-semibold text-indigo-500 no-underline hover:border-b-2"
    :href="href"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});
</script>
