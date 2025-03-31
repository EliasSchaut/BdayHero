<template>
  <a :href="href" class="flex items-center gap-x-4 px-4 py-2">
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
