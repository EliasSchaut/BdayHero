<template>
  <section
    class="dark:bg-second-950 relative flex w-full items-center justify-center bg-white bg-[url('/svg/bg-grid-light.svg')] bg-repeat dark:bg-[url('/svg/bg-grid.svg')]"
  >
    <div
      class="dark:bg-second-950 absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    />

    <div class="z-10 flex w-11/12 flex-col items-center justify-center">
      <slot />
    </div>
  </section>
</template>
