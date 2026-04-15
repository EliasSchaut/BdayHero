<template>
  <form @submit.prevent="validate">
    <slot />
  </form>
</template>

<script lang="ts">
import { loadingStore } from "~/store/loading";

export default defineComponent({
  setup() {
    return {
      loading: loadingStore(),
    };
  },
  methods: {
    async validate(e: Event) {
      const form_html = e.target as HTMLFormElement;
      if (!form_html.checkValidity()) {
        form_html.reportValidity();
      } else {
        this.loading.set_loading();
        const form_data = new FormData(form_html);

        try {
          await this.submit(e, form_data);
          this.loading.set_success_then_default();
        } catch (e) {
          this.loading.set_failure_then_default();
          throw e;
        }
      }
    },
  },
  props: {
    submit: {
      type: Function,
      required: true,
    },
  },
});
</script>
