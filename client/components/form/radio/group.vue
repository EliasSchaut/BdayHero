<template>
  <RadioGroup
    class="bg-second-100 mt-2 flex justify-center gap-x-3 rounded-2xl p-2"
  >
    <slot />
  </RadioGroup>
</template>

<script setup lang="ts">
import { RadioGroup } from '@headlessui/vue';
</script>
