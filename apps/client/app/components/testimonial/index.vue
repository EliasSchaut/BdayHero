<template>
  <figure class="bg-second-50 dark:bg-second-900 rounded-2xl p-8 text-sm/6">
    <blockquote class="text-second-900dark:text-white">
      <p>{{ `“${cite}”` }}</p>
    </blockquote>
    <figcaption class="mt-6 flex items-center gap-x-4">
      <img
        v-if="author_avatar_url"
        class="bg-second-50 size-10 rounded-full"
        :src="author_avatar_url"
        :alt="author_name"
      />
      <UserCircleIcon
        v-else
        class="h-10 w-10 rounded-full text-gray-300 dark:text-gray-500"
        aria-hidden="true"
      />

      <div>
        <div class="text-second-900 font-semibold dark:text-white">
          {{ author_name ?? $t("common.unknown.person") }}
        </div>
        <div class="text-second-600 dark:text-second-500">
          {{ `@${author_handle ?? $t("common.unknown.organisation")}` }}
        </div>
      </div>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/24/solid";

defineProps({
  cite: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    default: undefined,
  },
  author_handle: {
    type: String,
    default: undefined,
  },
  author_avatar_url: {
    type: String,
    default: undefined,
  },
});
</script>
