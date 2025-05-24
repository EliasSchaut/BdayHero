<template>
  <header class="z-10">
    <Disclosure as="nav" v-slot="{ open }">
      <div class="flex w-full items-center justify-between gap-x-12 p-6">
        <div class="flex gap-x-12">
          <div class="flex items-center justify-center gap-x-2">
            <nuxt-link class="text-2xl font-bold" href="/">
              <span>Kids</span>
              <Accent>Bday</Accent>
            </nuxt-link>
          </div>

          <div
            class="text-md text-second-700 dark:text-second-300 flex items-center space-x-12 font-medium"
          >
            <nuxt-link
              v-for="link in navigation"
              class="hover:bg-prime-50 dark:hover:bg-prime-950 hidden rounded-md px-2 py-1 md:inline"
              :href="link.href"
              >{{ link.name }}
            </nuxt-link>
          </div>
        </div>

        <div class="flex gap-x-6">
          <SettingLang class="hidden md:block" />
          <SettingTheme class="hidden md:block" />
          <div class="-mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="text-second-600 hover:bg-second-100 hover:text-second-900 focus:ring-prime-500 dark:hover:bg-second-700 mr-2.5 -ml-2.5 inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset dark:hover:text-white dark:focus:ring-white"
            >
              <span class="sr-only">{{ $t('common.sr.open_main_menu') }}</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <!-- NavBar Panel mobile -->
      <DisclosurePanel class="shadow-sm md:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <template v-for="link in navigation">
            <NuxtLink
              :to="link.href"
              :class="[
                $route.path.split('/')[1] === link.href.split('/')[1]
                  ? 'border-prime-500 bg-prime-50 text-prime-700 dark:bg-second-900 dark:text-white'
                  : 'text-second-500 hover:border-second-300 hover:bg-second-50 hover:text-second-700 dark:text-second-300 dark:hover:bg-second-700 border-transparent dark:hover:text-white',
                'block border-l-4 py-2 pr-4 pl-3 text-base font-medium',
              ]"
              >{{ link.name }}
            </NuxtLink>
          </template>
        </div>
        <div
          class="border-second-200 dark:border-second-700 flex justify-end gap-x-4 border-t px-4 pt-4 pb-3"
        >
          <SettingLang />
          <SettingTheme />
        </div>
      </DisclosurePanel>
    </Disclosure>
  </header>
</template>

<script lang="ts">
import { authStore } from '~/store/auth';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';

type NavigationType = Array<{
  name: string;
  href: string;
}>;

export default defineComponent({
  setup() {
    const auth = reactive(authStore());
    const { t } = useI18n();
    const navigation: ComputedRef<NavigationType> = computed(() => [
      {
        name: t('nav.home'),
        href: '/',
      },
      {
        name: t('nav.details'),
        href: '/details',
      },
      {
        name: t('nav.guests'),
        href: '/guests',
      },
      {
        name: t('nav.shifts'),
        href: '/shifts',
      },
    ]);

    return {
      auth,
      navigation,
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
  },
});
</script>
