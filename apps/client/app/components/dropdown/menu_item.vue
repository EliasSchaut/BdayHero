<template>
  <MenuItem
    as="div"
    class="hover:cursor-pointer text-second-700 hover:bg-second-100 dark:text-second-400 dark:hover:bg-second-900 text-sm px-4 py-2"
  >
    <slot />
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";
</script>
