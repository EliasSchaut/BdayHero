<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <tr
    :class="
      cn(
        'border-b transition-colors even:bg-gray-200 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
