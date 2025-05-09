<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 break-words" @close="hide()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="bg-second-500 bg-opacity-75 dark:bg-second-900 dark:bg-opacity-75 fixed inset-0 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          :class="[
            'flex min-h-full justify-center p-4 text-center sm:p-0',
            place_top ? 'items-start' : 'items-end sm:items-center',
          ]"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="bg-second-50 dark:bg-second-900 relative w-full transform rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 dark:text-white"
            >
              <slot />
              <div v-if="!hide_close" class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="bg-second-600 hover:bg-second-700 focus-visible:outline-second-600 dark:bg-second-800 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  @click="hide()"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default defineComponent({
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    place_top: {
      type: Boolean,
      default: false,
    },
    hide_close: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      open: ref(false),
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
  },
});
</script>
