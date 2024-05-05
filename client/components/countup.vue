<template>
  <span :id="id" />
</template>

<script lang="ts">
import { CountUp } from 'countup.js';
import * as timers from 'node:timers';

export default defineComponent({
  mounted() {
    const countUp = new CountUp(this.id, this.end_val, {
      startVal: this.start_val,
      duration: this.duration_count_up,
    });
    setTimeout(() => countUp.start(), this.delay);
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
      required: true,
    },
    duration_count_up: {
      type: Number,
      default: 3,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
});
</script>
