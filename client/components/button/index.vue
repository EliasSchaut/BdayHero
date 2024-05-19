<template>
  <button
    :class="
      cn(
        $props.class,
        success
          ? 'bg-green-400 hover:bg-green-500 focus-visible:outline-green-400 dark:bg-green-600 dark:focus-visible:outline-green-600'
          : '',
        loading ? 'opacity-50' : '',
        'flex w-full justify-center rounded-md px-3 py-1.5 align-middle text-sm font-semibold leading-6 shadow-sm transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      )
    "
    :disabled="loading"
  >
    <Spinner v-if="loading" />
    <span v-else-if="success">{{ success_msg }}</span>
    <slot v-else />
  </button>
</template>

<script lang="ts">
export default defineComponent({
  methods: {
    set_loading() {
      this.success = false;
      this.loading = true;
    },
    set_default() {
      this.success = false;
      this.loading = false;
    },
    set_success() {
      this.loading = false;
      this.success = true;
    },
    set_success_then_default(delay_between: number = 2) {
      this.set_success();
      setTimeout(() => this.set_default(), delay_between * 1000);
    },
  },
  setup() {
    return {
      loading: ref(false),
      success: ref(false),
    };
  },
  props: {
    success_msg: {
      type: String,
      default: 'Done!',
    },
    class: {
      type: String,
      default: '',
    },
  },
});
</script>
