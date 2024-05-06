<template>
  <div
    class="m-auto flex h-min w-min flex-col justify-center space-y-12 text-center align-middle font-semibold"
  >
    <span
      class="text-2xl opacity-0"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="600"
      :duration="1200"
      >Schon</span
    >
    <Countup
      class="m-auto w-min text-4xl font-bold opacity-0"
      :end_val="63"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 3 }"
      :hovered="{ scale: 3.5 }"
      :delay="1000"
      :duration="3000"
    />
    <span
      class="text-nowrap text-3xl font-semibold opacity-0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="1200"
      :duration="1200"
      >sind dabei!</span
    >
  </div>

  <h1 class="mt-10 text-center text-xl italic underline">Gästeliste</h1>
  <TableGuestlist class="text-md m-auto mt-2 xs:w-[20em]" />
</template>
