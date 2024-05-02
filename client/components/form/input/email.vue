<template>
  <FormInput
    :id="id"
    type="email"
    :label="show_label ? $t('common.form.mail') : ''"
    placeholder="you@example.com"
    :required="required"
    :icon="EnvelopeIcon"
    :side_label="side_label"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
import type { SideLabel } from '~/components/form/input/index.vue';

export default defineComponent({
  name: 'FormInputEmail',
  methods: { EnvelopeIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    show_label: {
      type: Boolean,
      default: false,
    },
    side_label: {
      type: Object as () => SideLabel,
      default: () => ({ label: '', href: null }),
    },
  },
});
</script>
