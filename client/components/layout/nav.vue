<template>
  <header class="z-10">
    <nav>
      <div class="flex w-full items-center justify-between gap-x-12 p-6">
        <div class="flex gap-x-12">
          <div class="flex items-center justify-center gap-x-2">
            <a class="text-2xl font-bold" href="/">
              <span>Kids</span>
              <Accent>Bday</Accent>
            </a>
          </div>

          <div
            class="text-md flex items-center space-x-12 font-medium text-second-700 dark:text-second-300"
          >
            <a
              class="hidden rounded-md px-2 py-1 hover:bg-prime-50 dark:hover:bg-prime-950 sm:inline"
              href="/#features"
              >{{ $t('nav.features') }}</a
            >
            <a
              class="hidden rounded-md px-2 py-1 hover:bg-prime-50 dark:hover:bg-prime-950 sm:inline"
              href="/#blog"
              >{{ $t('nav.blog') }}</a
            >
            <a
              class="hidden rounded-md px-2 py-1 hover:bg-prime-50 dark:hover:bg-prime-950 md:inline"
              href="/#community"
              >{{ $t('nav.community') }}</a
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
<script setup lang="ts"></script>
