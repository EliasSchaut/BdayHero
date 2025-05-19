<template>
  <section
    class="dark:bg-second-950 relative h-[70rem] w-full bg-white bg-[url('/svg/bg-dot-light.svg')] bg-repeat md:h-[50rem] dark:bg-[url('/svg/bg-dot.svg')]"
  >
    <div
      class="dark:bg-second-950 absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"
    />
    <slot />
  </section>
</template>
