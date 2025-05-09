<template>
  <section
    class="relative h-[70rem] w-full bg-white bg-[url('/svg/bg-dot-light.svg')] bg-repeat dark:bg-second-950 dark:bg-[url('/svg/bg-dot.svg')] md:h-[50rem]"
  >
    <div
      class="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] dark:bg-second-950"
    />
    <slot />
  </section>
</template>
