<template>
  <div class="prose flex flex-col justify-center dark:prose-invert">
    <div class="font-bold">{{ title }}</div>
    <div>
      <slot />
    </div>
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
