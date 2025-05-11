<template>
  <header class="z-10">
    <nav>
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
              class="hover:bg-prime-50 dark:hover:bg-prime-950 hidden rounded-md px-2 py-1 sm:inline"
              href="/"
              >{{ $t("nav.home") }}</nuxt-link
            >
            <nuxt-link
              class="hover:bg-prime-50 dark:hover:bg-prime-950 hidden rounded-md px-2 py-1 sm:inline"
              href="/details"
              >{{ $t("nav.details") }}</nuxt-link
            >
            <nuxt-link
              class="hover:bg-prime-50 dark:hover:bg-prime-950 hidden rounded-md px-2 py-1 md:inline"
              href="/guests"
              >{{ $t("nav.guests") }}</nuxt-link
            >
          </div>
        </div>

        <div class="flex gap-x-6">
          <SettingTheme />
          <SettingLang />
        </div>
      </div>
      <div class="bg-primary-500 dark:bg-primary-400 h-1 px-1" />
    </nav>
  </header>
</template>
