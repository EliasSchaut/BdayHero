<template>
  <div class="mx-5 h-[30rem]">
    <h1 class="flex justify-center text-4xl font-bold text-white">
      {{ title }}
    </h1>

    <div class="flex justify-center">
      <ul
        class="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 dark:border-gray-500 sm:mt-16 sm:pt-16 md:mx-0 md:max-w-none md:grid-cols-3"
      >
        <li v-for="article of articles" :key="article.title">
          <ArticlesPreview
            :title="article.title"
            :href="article.href"
            :date="article.date"
            :description="article.desc"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'From the Blog',
  },
  articles: {
    type: Array<{
      title: string;
      href: string;
      date: string;
      desc: string;
    }>,
    required: true,
  },
});
</script>
