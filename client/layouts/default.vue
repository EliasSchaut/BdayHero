<template>
  <Body
    class="text-secondary-900 bg-white selection:bg-prime-100 dark:bg-second-950 dark:text-white dark:selection:bg-prime-900"
  />
  <div class="flex h-screen flex-col justify-between">
    <LayoutNav />
    <main class="mb-auto">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
