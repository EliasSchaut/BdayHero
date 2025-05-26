<template>
  <button>
    <slot v-if="!loading" />
    <Spinner v-else class="size-6" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
