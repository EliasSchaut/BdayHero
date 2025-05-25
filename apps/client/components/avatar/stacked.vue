<template>
  <img
    v-if="href"
    class="dark:ring-second-900 relative inline-block size-8 rounded-full ring-2 ring-white"
    :src="href"
    alt="Avatar"
    :title="name"
  />
  <span
    v-else
    class="bg-second-500 dark:ring-second-900 relative z-30 inline-flex size-8 items-center justify-center rounded-full ring-2 ring-white"
  >
    <span class="font-medium text-white">{{ initials }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps({
  initials: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: '',
  },
});
</script>
