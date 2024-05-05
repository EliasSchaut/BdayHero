<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <caption
    :class="cn('mt-4 text-sm text-gray-500 dark:text-gray-400', props.class)"
  >
    <slot />
  </caption>
</template>
