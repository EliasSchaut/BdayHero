<template>
  <div class="flex flex-col items-center gap-y-1">
    <QuestionMarkCircleIconSolid v-if="solid" class="h-5 w-5" />
    <QuestionMarkCircleIcon v-else class="h-5 w-5" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import { QuestionMarkCircleIcon as QuestionMarkCircleIconSolid } from "@heroicons/vue/20/solid";

defineProps({
  solid: {
    type: Boolean,
    default: false,
  },
});
</script>
