<template>
  <MenuButton class="flex justify-center">
    <slot />
  </MenuButton>
</template>

<script setup lang="ts">
import { MenuButton } from "@headlessui/vue";
</script>
