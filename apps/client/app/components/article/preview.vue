<template>
  <a
    :href="href"
    target="_blank"
    class="group flex flex-col items-center justify-start gap-6 rounded-2xl bg-white p-5 hover:bg-second-100 dark:bg-second-950 dark:hover:bg-second-900 sm:flex-row"
  >
    <div class="flex max-w-xl flex-col items-start justify-between">
      <div class="flex items-center gap-x-4 text-xs">
        <time class="text-second-500 dark:text-second-400">{{ date }}</time>
      </div>
      <div>
        <h3
          class="mt-3 text-lg font-semibold leading-6 text-second-900 group-hover:text-second-600 dark:text-white dark:group-hover:text-second-200"
        >
          {{ title }}
        </h3>
        <p
          class="mt-5 line-clamp-3 text-sm leading-6 text-second-600 dark:text-second-100"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
});
</script>
