<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="border-second-300 w-full border-t" />
    </div>
    <div class="relative flex justify-center">
      <span class="text-second-500 bg-second-100 px-2">
        <PlusIcon class="text-second-500 size-5" aria-hidden="true" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid';
</script>
