<template>
  <div>
    <nav v-if="!mobile_only" class="hidden lg:inline">
      <ul
        class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/10"
      >
        <li v-for="page in pages" :key="page.title">
          <nuxt-link
            v-if="!page.hide"
            :href="page.href"
            :class="[
              'relative block px-3 py-2 transition',
              page.matches.test($route.href)
                ? 'text-indigo-500 dark:text-indigo-400'
                : 'hover:text-indigo-500 dark:hover:text-indigo-400',
            ]"
          >
            {{ page.title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <button
      :class="[
        mobile_only ? '' : 'lg:hidden',
        'group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/10 dark:hover:ring-white/20',
      ]"
      @click="$refs.mobile_nav.show()"
    >
      {{ $t('common.menu') }}
      <ChevronDownIcon
        class="ml-3 h-auto w-2 stroke-gray-500 group-hover:stroke-gray-700 dark:group-hover:stroke-gray-400"
      />
    </button>
  </div>
  <Modal ref="mobile_nav" hide_close place_top>
    <div class="flex flex-row-reverse items-center justify-between">
      <button
        aria-label="Close menu"
        class="-m-1 p-1"
        @click="$refs.mobile_nav.hide()"
      >
        <XMarkIcon class="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </button>
      <h2 class="text-sm font-medium text-gray-600 dark:text-gray-400">
        {{ $t('common.nav_title') }}
      </h2>
    </div>
    <nav class="mt-6">
      <ul
        class="-my-2 divide-y divide-gray-100 text-base text-gray-800 dark:divide-gray-100/5 dark:text-gray-300"
      >
        <li v-for="page in pages" :key="page.title">
          <nuxt-link
            v-if="!page.hide"
            :class="[
              'block px-3 py-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800',
              page.matches.test($route.href)
                ? 'border-l-4 border-indigo-500 text-indigo-500 dark:border-indigo-600 dark:text-indigo-400'
                : 'hover:text-indigo-500 dark:hover:text-indigo-400',
            ]"
            :href="page.href"
            @click="$refs.mobile_nav.hide()"
          >
            {{ page.title }}
          </nuxt-link>
        </li>
      </ul>
      <div
        :class="[
          mobile_only ? '' : 'md:hidden',
          'mt-5 flex flex-row justify-stretch space-x-4',
        ]"
      >
        <SettingLang class="w-full" />
        <SettingTheme class="w-full" />
      </div>
    </nav>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { authStore } from '~/store/auth';

export default defineComponent({
  components: { ChevronDownIcon, XMarkIcon },
  props: {
    mobile_only: { type: Boolean, default: false },
  },
  setup() {
    const { t } = useI18n();
    const auth = reactive(authStore());

    return {
      pages: computed(
        () =>
          [
            {
              title: t('pages.home'),
              href: '/',
              matches: /^\/$/,
            },
            {
              title: t('pages.details'),
              href: '/details',
              matches: /^\/details$/,
            },
            {
              title: t('pages.guest_list'),
              href: '/guest_list',
              matches: /^\/guest_list$/,
            },
            {
              title: t('pages.shifts'),
              href: '/shifts',
              matches: /^\/shifts$/,
            },
            {
              title: t('pages.login'),
              href: '/login',
              matches: /^\/login$/,
              hide: auth.logged_in,
            },
            {
              title: t('pages.sign_up'),
              href: '/sign_up',
              matches: /^\/sign_up$/,
              hide: auth.logged_in,
            },
            {
              title: t('pages.profile'),
              href: '/profile',
              matches: /^\/profile$/,
              hide: !auth.logged_in,
            },
          ] as Array<{
            title: string;
            href: string;
            matches: RegExp;
            hide?: boolean;
          }>,
      ),
    };
  },
});
</script>
