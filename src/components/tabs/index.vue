<template>
  <div
    class="b relative mx-auto my-40 flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] md:h-[40rem]"
  >
    <div
      class="no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible"
    >
      <TabsButtons v-for="(tab, idx) in tabs" :title="tab.title" :index="idx" />
    </div>

    <div class="relative mt-16 h-full w-full">
      <div
        v-for="(tab, idx) in tabsState.tabs"
        class="absolute left-0 h-full w-full transition-all duration-300 ease-in-out"
        :key="tab.title"
        :style="{
          scale: 1 - idx * 0.1,
          top: tabsState.hovering ? `${idx * -50}px` : '0',
          zIndex: -idx,
          opacity: idx < 3 ? 1 - idx * 0.1 : 0,
        }"
      >
        <div
          class="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl"
          v-html="tab.content"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { tabsStore, type TabType } from '~/store/tabs';

export default defineComponent({
  setup(props) {
    const tabsState = tabsStore();
    tabsState.setTabs(props.tabs);
    tabsState.setActive(props.tabs[0]);

    return {
      tabsState,
    };
  },
  props: {
    tabs: {
      type: Array<TabType>,
      required: true,
    },
  },
});
</script>
