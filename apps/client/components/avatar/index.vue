<template>
  <div>
    <img
      v-if="href"
      class="inline-block size-9 rounded-full"
      :src="href"
      alt="Avatar"
    />
    <span
      v-else
      class="inline-flex size-9 items-center justify-center rounded-full bg-gray-500"
    >
      <span class="font-medium text-white">{{ initials }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  initials: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: null,
  },
});
</script>
