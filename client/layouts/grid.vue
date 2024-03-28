<template>
  <div
    class="relative flex h-full w-full items-center justify-center bg-black/[0.2] bg-white dark:bg-black"
    style="background: url('/svg/bg-grid.svg') repeat"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    />

    <div class="flex w-11/12 flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
