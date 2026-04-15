<template>
  <span ref="count_up_ref" :id="id" />
</template>

<script lang="ts">
export default defineComponent({
  created() {
    if (this.autostart) this.start(this.end_val);
  },
  methods: {
    async start(end_val: number) {
      const countUpModule = await import('countup.js');
      const countUp = new countUpModule.CountUp(this.id, end_val, {
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
