<template>
  <div class="overflow-hidden">
    <div class="px-4 py-6 sm:px-6">
      <h3
        class="text-second-900 text-base leading-7 font-semibold dark:text-white"
      >
        {{ title }}
      </h3>
      <p
        v-if="subtitle.length"
        class="text-second-500 dark:text-second-300 mt-1 max-w-2xl text-sm leading-6"
      >
        {{ subtitle }}
      </p>
    </div>
    <div class="border-second-100 dark:border-second-800 border-t">
      <dl class="divide-second-100 dark:divide-second-800 divide-y">
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
