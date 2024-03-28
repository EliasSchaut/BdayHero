<template>
  <div
    class="relative mx-5 my-40 flex h-[70rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]"
  >
    <div
      class="no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-visible [perspective:1000px]"
    >
      <TabsButtons
        class="hidden sm:block"
        v-for="tab_name in tabsState.tab_names_static"
        :title="tab_name"
      />
      <TabsSelect class="sm:hidden" :titles="tabsState.tab_names_static" />
    </div>

    <div class="relative mt-16 h-full w-full">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { tabsStore } from '~/store/tabs';

export default defineComponent({
  setup() {
    const tabsState = tabsStore();
    return {
      tabsState,
    };
  },
});
</script>
