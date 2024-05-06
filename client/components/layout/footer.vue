<template>
  <footer>
    <div class="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8">
      <button @click="auth.logged_in = !auth.logged_in">
        Logged In: {{ auth.logged_in }}
      </button>
      <nav
        class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        aria-label="Footer"
      >
        <div v-for="item in navigation.main" :key="item.name" class="pb-6">
          <nuxt-link
            :to="item.href"
            class="text-sm leading-6 text-gray-500 hover:text-gray-400"
            >{{ item.name }}</nuxt-link
          >
        </div>
      </nav>
      <p class="mt-10 text-center text-xs leading-5 text-gray-500">
        &copy; 2024 Elias Lorenz Schaut
      </p>
    </div>
  </footer>
</template>

<script setup>
import { authStore } from '~/store/auth';

const { t } = useI18n();
const auth = authStore();

const navigation = {
  main: [
    { name: t('pages.imprint'), href: '/imprint' },
    { name: t('pages.privacy'), href: '/privacy' },
    { name: t('pages.resources'), href: '/resources' },
    {
      name: t('pages.source'),
      href: 'https://github.com/EliasSchaut/BdayHero',
    },
  ],
};
</script>
