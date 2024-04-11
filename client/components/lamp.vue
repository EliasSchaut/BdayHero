<template>
  <div
    class="relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-black"
  >
    <div
      class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center"
    >
      <div
        class="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[20rem] overflow-visible from-cyan-500 via-transparent to-transparent text-black [--conic-position:from_70deg_at_center_top] dark:text-white sm:w-[30rem]"
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }"
      >
        <div
          class="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-black"
        />
        <div
          class="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_right,white,transparent)] dark:bg-black"
        />
      </div>
      <div
        class="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[20rem] from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top] sm:w-[30rem]"
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }"
      >
        <div
          class="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-black"
        />
        <div
          class="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-black"
        />
      </div>
      <div
        class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white blur-2xl dark:bg-black"
      ></div>
      <div
        class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"
      ></div>
      <div
        class="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
      ></div>
      <div
        class="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[7rem] bg-cyan-400 sm:w-[30rem]"
      ></div>

      <div
        class="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-black"
      ></div>
    </div>

    <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">
      <slot />
    </div>
  </div>
</template>
