<template>
  <div class="mx-4 my-10 flex flex-row justify-center">
    <Card
      :title="$t('privacy.title')"
      :icon="ClipboardDocumentCheckIcon"
      class="w-full align-middle lg:w-2/3"
    >
      <Faq
        :faqs="[
          {
            question: $t('privacy.data.title'),
            answer: $t('privacy.data.body'),
          },
          {
            question: $t('privacy.cookies.title'),
            answer: $t('privacy.cookies.body'),
          },
          {
            question: $t('privacy.rights.title'),
            answer: $t('privacy.rights.body'),
          },
        ]"
      />
    </Card>
  </div>
</template>

<script lang="ts">
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'privacy',
  methods: {
    ClipboardDocumentCheckIcon,
  },
  data() {
    return {
      faqs: [
        {
          question: this.$t('privacy.registration.title'),
          answer: this.$t('privacy.registration.body'),
        },
        {
          question: this.$t('privacy.access.title'),
          answer: this.$t('privacy.access.body'),
        },
        {
          question: this.$t('privacy.cookies.title'),
          answer: this.$t('privacy.cookies.body'),
        },
        {
          question: this.$t('privacy.rights.title'),
          answer: this.$t('privacy.rights.body'),
        },
      ],
    };
  },
});
</script>
