<template>
  <span class="mx-20 mt-20 flex justify-center text-2xl text-white"
    >Ein Geburtstag voller&nbsp;
    <span id="typewriter" class="font-bold text-pink-400" />
  </span>
</template>

<script lang="ts">
import Typewriter from 'typewriter-effect/dist/core';

export default defineComponent({
  mounted() {
    new Typewriter('#typewriter', {
      strings: ['Spaß', 'Überraschung', 'Freude'],
      loop: true,
      autoStart: true,
    });
  },
});
</script>
