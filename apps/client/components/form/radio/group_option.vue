<template>
  <RadioGroupOption>
    <div
      :class="[
        checked
          ? 'bg-prime-600 hover:bg-prime-500 text-white ring-0'
          : 'dark:bg-second-900 ring-second-300 hover:bg-second-50 dark:hover:bg-second-950 dark:ring-second-700 bg-white ring-1',
        'active:ring-prime-600 flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase focus:outline-hidden active:ring-2 active:ring-offset-2 sm:flex-1',
      ]"
    >
      <slot />
    </div>
  </RadioGroupOption>
</template>

<script setup lang="ts">
import { RadioGroupOption } from '@headlessui/vue';

defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>
