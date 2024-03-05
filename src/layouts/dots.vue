<template>
  <div
    class="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black"
    style="background: url('/svg/bg-dot.svg') repeat"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    ></div>
    <slot />
  </div>
</template>
