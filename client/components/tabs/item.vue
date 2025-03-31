<template>
  <div
    class="absolute left-0 h-[40rem] w-full transition-all duration-300 ease-in-out"
    :style="{
      scale: 1 - idx * 0.1,
      top: tabsState.hovering ? `${idx * -45}px` : `${idx * -22.5}px`,
      zIndex: -idx,
      opacity: idx === 0 ? 1 : tabsState.hovering ? 1 - idx * 0.1 : 0,
    }"
  >
    <div
      class="flex flex-col flex-wrap place-content-center gap-2 place-self-stretch rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 py-5 text-xl font-bold text-white md:flex-row md:text-4xl"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { tabsStore } from '~/store/tabs';

export default defineComponent({
  setup(props) {
    const tabsState = tabsStore();
    tabsState.addTab(props.title);
    const idx = ref(tabsState.getIndexOfTab(props.title));
    watch(
      () => tabsState.getIndexOfTab(props.title),
      (new_idx) => {
        idx.value = new_idx;
      },
    );

    return {
      tabsState,
      idx,
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
