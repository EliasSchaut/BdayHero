<template>
  <select
    @mouseenter="() => tabsState.setHovering(true)"
    @mouseleave="() => tabsState.setHovering(false)"
    @change="
      (e: Event) =>
        tabsState.moveSelectedTabToTop((e.target as HTMLOptionElement).value)
    "
    class="w-full rounded-md border-none bg-gray-800 py-2 pl-3 text-white opacity-90 shadow-sm ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm"
  >
    <option
      v-for="title in titles"
      :key="title"
      :selected="tabsState.active?.title === title"
      :value="title"
    >
      {{ title }}
    </option>
  </select>
</template>

<script lang="ts">
import { tabsStore } from "~/store/tabs";

export default defineComponent({
  setup() {
    return {
      tabsState: tabsStore(),
    };
  },
  props: {
    titles: {
      type: Array<string>,
      required: true,
    },
  },
});
</script>
