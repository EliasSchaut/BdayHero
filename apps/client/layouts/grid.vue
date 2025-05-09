<template>
  <section
    class="relative flex w-full items-center justify-center bg-[url('/svg/bg-grid-light.svg')] bg-repeat dark:bg-[url('/svg/bg-grid.svg')]"
  >
    <div
      class="-z-1 absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-second-950"
    />

    <div class="flex w-11/12 flex-col items-center justify-center">
      <slot />
    </div>
  </section>
</template>
