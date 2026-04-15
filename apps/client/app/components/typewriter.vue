<template>
  <span
    id="typewriter"
    ref="target"
    class="font-bold text-pink-500 dark:text-pink-400"
  />
</template>

<script lang="ts">
import Typewriter from "typewriter-effect/dist/core";
import { useElementVisibility } from "@vueuse/core";

export default defineComponent({
  setup() {
    return { typewriter: ref<Typewriter | null>(null) };
  },
  mounted() {
    this.typewriter = new Typewriter("#typewriter", {
      strings: this.strings,
      loop: true,
      autoStart: true,
    });
    const target_is_visible = useElementVisibility(
      this.$refs.target as HTMLElement,
    ) as Ref<boolean>;
    watch(target_is_visible, this.on_element_visibility);
  },
  methods: {
    on_element_visibility(is_visible: boolean) {
      if (is_visible) {
        this.play();
      } else {
        this.pause();
      }
    },
    pause() {
      this.typewriter.pause();
    },
    play() {
      this.typewriter.start();
    },
  },
  props: {
    heading: {
      type: String,
      default: "",
    },
    strings: {
      type: Array<String>,
      required: true,
    },
  },
});
</script>
