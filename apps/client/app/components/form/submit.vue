<template>
  <div>
    <ButtonPrime
      type="submit"
      :class="{
        '!bg-green-500 hover:!bg-green-600 focus-visible:!outline-green-400 dark:!bg-green-600 dark:focus-visible:!outline-green-600':
          success,
        '!bg-red-500 hover:!bg-red-600 focus-visible:!outline-red-400 dark:!bg-red-600 dark:focus-visible:!outline-red-600':
          failure,
        '!bg-gray-500 opacity-50 hover:!cursor-progress': loading,
        'flex w-full justify-center transition duration-200 ease-in-out': true,
      }"
      :disabled="loading"
    >
      <Spinner v-if="loading" />
      <CheckCircleIcon class="size-6" v-else-if="success" />
      <XCircleIcon class="size-6" v-else-if="failure" />
      <slot v-else />
    </ButtonPrime>
    <span
      class="mt-1 flex justify-center gap-x-1 text-center text-xs font-light"
    >
      <span>{{ $t('common.form.privacy.pre') }}</span>
      <nuxt-link href="/privacy" class="text-prime-500 underline">{{
        $t('common.form.privacy.post')
      }}</nuxt-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import { loadingStore } from '~/store/loading';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

const loading_state = loadingStore();
const loading = computed(() => loading_state.loading);
const success = computed(() => loading_state.success);
const failure = computed(() => loading_state.failure);
</script>
