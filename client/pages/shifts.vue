<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600 dark:text-indigo-400">
        501
      </p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
      >
        {{ $t('common.err.501.title') }}
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        {{ $t('shifts.desc') }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="https://docs.google.com/spreadsheets/d/1A6ok9rZWiDvbucqrs31SaXXD6e5TT2OAr6PZSvgjhi4/edit?usp=sharing"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          target="_blank"
          >{{ $t('shifts.plan.goto') }}
        </a>
      </div>
    </div>
  </main>
</template>
