<template>
  <div
    class="relative flex h-[40rem] flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased dark:bg-black"
  >
    <LayoutHeading
      v-if="heading !== ''"
      class="relative -top-10 flex justify-center"
    >
      {{ heading }}
    </LayoutHeading>
    <div
      class="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        :class="[
          'flex w-max min-w-full shrink-0 animate-scroll flex-nowrap gap-4 py-4',
          pause_on_hover ? 'hover:[animation-play-state:paused]' : '',
        ]"
        :style="{ animationDirection: direction, animationDuration: speed }"
      >
        <li
          v-for="card in cards"
          :key="card.title"
          class="bg- relative w-[250px] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 bg-gradient-to-b from-gray-700 to-gray-800 px-8 py-6 dark:from-gray-800 dark:to-gray-900 sm:w-[350px] md:w-[450px]"
        >
          <blockquote>
            <div
              aria-hidden="true"
              class="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
            />
            <span
              class="relative z-20 text-sm font-normal italic leading-[1.6] text-gray-100"
            >
              {{ card.content }}
            </span>
            <div class="relative z-20 mt-6 self-end">
              <span class="flex flex-col gap-1">
                <span class="text-sm font-normal leading-[1.6] text-gray-400">
                  {{ card.name }}
                </span>
                <span class="text-sm font-normal leading-[1.6] text-gray-400">
                  {{ card.title }}
                </span>
              </span>
            </div>
          </blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    cards: {
      type: Array<{ title: string; content: any; name?: string }>,
      required: true,
    },
    speed: {
      type: String,
      default: '20s',
    },
    direction: {
      type: String,
      default: 'forwards',
    },
    pause_on_hover: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      default: '',
    },
  },
});
</script>
