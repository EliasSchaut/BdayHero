<template>
  <RadioGroupOption>
    <div
      :class="[
        checked
          ? 'bg-indigo-600 text-white ring-0 hover:bg-indigo-500'
          : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50',
        'flex cursor-pointer items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase focus:outline-hidden active:ring-2 active:ring-indigo-600 active:ring-offset-2 sm:flex-1',
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
