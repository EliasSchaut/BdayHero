<template>
  <MenuButton
    class="bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <slot />
  </MenuButton>
</template>

<script setup lang="ts">
import { MenuButton } from '@headlessui/vue';
</script>
