<template>
  <MenuItem
    class="flex items-center gap-x-4 hover:cursor-pointer text-second-700 hover:bg-second-100 dark:text-second-400 dark:hover:bg-second-900 text-sm"
  >
    <a class="px-4 py-2" :href="href">
      <slot />
    </a>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";

defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
