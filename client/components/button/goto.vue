<template>
  <nuxt-link
    :href="button_link"
    type="button"
    class="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {{ button_label }}
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
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
