<template>
  <Body class="bg-gray-100 dark:bg-gray-900">
    <div class="mb-12 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div class="flex items-center justify-center">
        <div class="absolute top-5">
          <LayoutNav />
        </div>
      </div>

      <div class="absolute right-5 top-5 hidden gap-4 sm:flex">
        <SettingLang />
        <SettingTheme />
      </div>

      <main
        class="mx-auto w-full px-6 py-32 text-base leading-7 text-gray-700 dark:text-gray-100 md:w-3/4 lg:w-2/3 lg:px-8 xl:w-1/2"
      >
        <slot />
      </main>
      <LayoutFooter />
    </div>
  </Body>
</template>
