<template>
  <button
    class="bg-white border-1 border-solid border-second-400 py-1.5 rounded-md"
  >
    <div class="flex justify-center gap-x-5">
      <img
        class="w-6"
        :src="`/svg/${provider}.svg`"
        :alt="`${provider} icon`"
      />
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  provider: {
    type: String,
    required: true,
  },
});
</script>
