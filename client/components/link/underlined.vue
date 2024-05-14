<template>
  [<router-link v-if="internal" class="underline" target="_blank" :to="href">{{
    value
  }}</router-link>
  <a v-else class="underline" target="_blank" :href="href">{{ value }}</a
  >]
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  internal: {
    type: Boolean,
    default: false,
  },
});
</script>
