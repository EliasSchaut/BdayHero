<template>
  <div
    class="relative flex h-full w-full items-center justify-center bg-black/[0.2] bg-white dark:bg-black dark:bg-white/[0.2]"
    style="background: url('/bg-grid.svg') repeat"
  >
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    />

    <slot />
  </div>
</template>
