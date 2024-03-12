<template>
  <span
    class="mt-20 flex flex-col justify-center text-center text-2xl text-white sm:flex-row"
    >{{ heading + (heading.length ? '&nbsp;' : '') }}
    <span id="typewriter" class="font-bold text-pink-400" />
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
