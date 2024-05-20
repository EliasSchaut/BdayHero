<template>
  <Button
    ref="button"
    type="submit"
    class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    {{ label }}
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormSubmit',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    set_loading() {
      this.$refs.button.set_loading();
    },
    set_default() {
      this.$refs.button.set_default();
    },
    set_success() {
      this.$refs.button.set_success();
    },
    set_success_then_default() {
      this.$refs.button.set_success_then_default();
    },
  },
});
</script>
