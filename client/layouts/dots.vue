<template>
  <div
    class="relative flex h-[70rem] w-full items-center justify-center bg-white bg-[url('/svg/bg-dot-light.svg')] bg-repeat dark:bg-black dark:bg-[url('/svg/bg-dot.svg')] md:h-[50rem]"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
    />
    <slot />
  </div>
</template>
