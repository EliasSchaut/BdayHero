<template>
  <ButtonPrime
    ref="button"
    type="submit"
    class="flex w-full justify-center text-sm leading-6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <slot />
  </ButtonPrime>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormSubmit",
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
