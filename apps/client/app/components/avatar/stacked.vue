<template>
  <img
    v-if="href"
    :class="{
      'dark:ring-second-900 relative inline-block rounded-full ring-2 ring-white': true,
      'size-8': !small,
      'size-6': small,
    }"
    :src="href"
    alt="Avatar"
    :title="name"
  />
  <span
    v-else
    :class="{
      'bg-second-500 dark:ring-second-900 relative z-30 inline-flex items-center justify-center rounded-full ring-2 ring-white': true,
      'size-8': !small,
      'size-6': small,
    }"
  >
    <span
      :class="{
        'font-medium text-white': true,
        'text-sm': !small,
        'text-xs': small,
      }"
      >{{ initials }}</span
    >
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
  small: {
    type: Boolean,
    default: false,
  },
});
</script>
