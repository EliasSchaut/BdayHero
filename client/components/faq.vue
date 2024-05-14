<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="mx-auto px-6 pb-6">
      <div class="mx-auto divide-y divide-gray-900/10 dark:divide-white/10">
        <dl class="space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
          <Disclosure
            as="div"
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900 dark:text-white"
              >
                <span class="text-base font-semibold leading-7">{{
                  faq.question
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p
                class="text-base leading-7 text-gray-600 dark:text-gray-300"
                v-html="faq.answer"
              />
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'faq',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MinusSmallIcon,
    PlusSmallIcon,
  },
  props: {
    faqs: {
      type: Array<{ question: string; answer: string }>,
      required: true,
    },
  },
});
</script>
