<template>
  <div class="m-4 block shrink-0">
    <div class="flex items-center">
      <Avatar :href="href" :initials="initials" />
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-700">
          {{ full_name }}
        </p>
        <p v-if="note" class="text-xs font-medium text-gray-500">
          {{ note }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  initials: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
});
</script>
