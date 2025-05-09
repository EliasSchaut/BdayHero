<template>
  <h1 class="text-center text-xl italic underline">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
