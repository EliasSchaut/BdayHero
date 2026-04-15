<template>
  <div class="flex justify-center">
    <ul
      class="z-10 mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 pt-10 dark:border-gray-500 sm:grid-cols-2 sm:gap-y-16 md:mx-0 md:max-w-none lg:grid-cols-3"
    >
      <li v-for="article of articles" :key="article.title">
        <ArticlePreview
          :title="article.title"
          :href="article.href"
          :date="article.date"
          :description="article.desc"
        />
      </li>
    </ul>
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
