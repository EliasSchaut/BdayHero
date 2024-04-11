<template>
  <div
    class="flex items-center"
    :style="{
      perspective: '1000px',
    }"
  >
    <div
      ref="card"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      class="flex items-center justify-center transition-all duration-200 ease-linear"
      :style="{
        transformStyle: 'preserve-3d',
      }"
    >
      <div
        class="group/card w-[16rem] rounded-xl border border-black/[0.1] bg-gray-50 p-6 [transform-style:preserve-3d] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] xs:w-[20rem] [&>*]:[transform-style:preserve-3d]"
      >
        <p
          class="w-fit text-xl font-bold text-neutral-600 transition duration-200 ease-linear dark:text-white"
          :style="{
            transform: mouseEntered ? 'translateZ(50px)' : 'translateZ(0px)',
          }"
        >
          {{ title }}
        </p>
        <p
          class="mt-2 w-fit max-w-sm text-sm text-neutral-500 transition duration-200 ease-linear dark:text-neutral-300"
          :style="{
            transform: mouseEntered ? 'translateZ(60px)' : 'translateZ(0px)',
          }"
        >
          {{ subtitle }}
        </p>
        <div
          class="mt-4 w-full transition duration-200 ease-linear"
          :style="{
            transform: mouseEntered ? 'translateZ(100px)' : 'translateZ(0px)',
          }"
        >
          <img
            :src="image_src"
            :alt="image_alt.length ? image_alt : title"
            class="h-[120px] w-full rounded-xl object-cover object-center group-hover/card:shadow-xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      mouseEntered: ref(false),
    };
  },
  methods: {
    handleMouseMove(e: MouseEvent) {
      const card = this.$refs.card as HTMLDivElement;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      card.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    },
    handleMouseEnter() {
      this.mouseEntered = true;
    },
    handleMouseLeave() {
      const card = this.$refs.card as HTMLDivElement;
      if (card) {
        this.mouseEntered = false;
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      }
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image_src: {
      type: String,
      required: true,
    },
    image_alt: {
      type: String,
      default: '',
    },
  },
});
</script>
