<template>
  <div class="flex flex-col items-center gap-y-1">
    <CheckCircleIconSolid v-if="solid" class="h-5 w-5" />
    <CheckCircleIcon v-else class="h-5 w-5" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/vue/20/solid";

defineProps({
  solid: {
    type: Boolean,
    default: false,
  },
});
</script>
