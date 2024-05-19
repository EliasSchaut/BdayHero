<template>
  <span
    class="flex flex-col justify-center bg-white pt-20 text-center text-2xl text-zinc-900 dark:bg-black dark:text-white sm:flex-row"
    >{{ heading + (heading.length ? '&nbsp;' : '') }}
    <span id="typewriter" class="font-bold text-pink-500 dark:text-pink-400" />
  </span>
</template>

<script lang="ts">
import Typewriter from 'typewriter-effect/dist/core';

export default defineComponent({
  mounted() {
    new Typewriter('#typewriter', {
      strings: this.strings,
      loop: true,
      autoStart: true,
    });
  },
  props: {
    heading: {
      type: String,
      default: '',
    },
    strings: {
      type: Array<String>,
      required: true,
    },
  },
});
</script>
