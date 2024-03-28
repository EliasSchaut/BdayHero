<template>
  <footer>
    <div class="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8">
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
const navigation = {
  main: [
    { name: 'Impressum', href: '/imprint' },
    { name: 'Datenschutz', href: '/privacy' },
    { name: 'Resources', href: '/resources' },
  ],
};
</script>
