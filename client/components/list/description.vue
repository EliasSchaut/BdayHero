<template>
  <div class="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-lg">
    <div class="px-4 py-6 sm:px-6">
      <h3
        class="text-base font-semibold leading-7 text-gray-900 dark:text-white"
      >
        {{ title }}
      </h3>
      <p
        v-if="subtitle.length"
        class="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400"
      >
        {{ subtitle }}
      </p>
    </div>
    <div class="border-t border-gray-100 dark:border-gray-900">
      <dl class="divide-y divide-gray-100 dark:divide-gray-900">
        <slot />
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>
