<template>
  <div class="flex flex-col items-center gap-y-1">
    <XCircleIconSolid v-if="solid" class="h-5 w-5" />
    <XCircleIcon v-else class="h-5 w-5" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';
import { XCircleIcon as XCircleIconSolid } from '@heroicons/vue/20/solid';

defineProps({
  solid: {
    type: Boolean,
    default: false,
  },
});
</script>
