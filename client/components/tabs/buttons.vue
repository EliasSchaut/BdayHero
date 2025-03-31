<template>
  <button
    :key="title"
    @click="() => tabsState.moveSelectedTabToTop(title)"
    @mouseenter="() => tabsState.setHovering(true)"
    @mouseleave="() => tabsState.setHovering(false)"
    class="relative rounded-full px-6 py-2"
  >
    <span
      v-if="tabsState.active === title"
      class="transition-full absolute inset-0 rounded-full bg-gray-200 duration-200 dark:bg-zinc-800"
    />

    <span class="relative block text-black dark:text-white">
      {{ title }}
    </span>
  </button>
</template>

<script lang="ts">
import { tabsStore } from '~/store/tabs';

export default defineComponent({
  setup() {
    return {
      tabsState: tabsStore(),
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
