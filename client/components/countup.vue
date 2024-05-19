<template>
  <span :id="id" />
</template>

<script lang="ts">
import { CountUp } from 'countup.js';
import * as timers from 'node:timers';

export default defineComponent({
  mounted() {
    if (this.autostart) this.start(this.end_val);
  },
  methods: {
    start(end_val: number) {
      const countUp = new CountUp(this.id, end_val, {
        startVal: this.start_val,
        duration: this.duration_count_up,
      });
      setTimeout(() => countUp.start(), this.delay);
    },
  },
  props: {
    id: {
      type: String,
      default: 'countUp',
    },
    start_val: {
      type: Number,
      default: 0,
    },
    end_val: {
      type: Number,
      default: 0,
    },
    duration_count_up: {
      type: Number,
      default: 3,
    },
    delay: {
      type: Number,
      default: 0,
    },
    autostart: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
