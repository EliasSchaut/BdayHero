<template>
  <div
    class="border-second-200 dark:border-second-700 dark:bg-second-900 dark:text-second-100 overflow-hidden rounded-xl border bg-white"
  >
    <div
      class="border-second-900/5 bg-second-50 dark:bg-second-800 flex items-center gap-x-4 border-b p-6"
    >
      <div
        class="ring-second-900/10 dark:dark:bg-second-900 dark:ring-second-700 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white object-cover ring-1"
      >
        <component class="h-8 w-8" :is="icon()" />
      </div>

      <div
        class="text-second-900 dark:text-second-200 text-lg leading-6 font-medium"
      >
        {{ title }}
      </div>
    </div>
    <div
      class="text-second-500 dark:text-second-400 px-6 py-4 text-sm leading-6 break-words"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElementCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: Function,
      required: true,
    },
  },
});
</script>
