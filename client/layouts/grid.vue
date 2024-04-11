<template>
  <div
    class="relative flex h-full w-full items-center justify-center bg-white bg-[url('/svg/bg-grid-light.svg')] bg-repeat dark:bg-black dark:bg-[url('/svg/bg-grid.svg')]"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    />

    <div class="flex w-11/12 flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
