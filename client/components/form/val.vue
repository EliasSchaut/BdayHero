<template>
  <form @submit.prevent="validate">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    validate(e: Event) {
      const form_html = e.target as HTMLFormElement;
      if (!form_html.checkValidity()) {
        form_html.reportValidity();
      } else {
        const form_data = new FormData(form_html);
        this.submit(e, form_data);
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
