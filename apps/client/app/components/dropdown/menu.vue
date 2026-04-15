<template>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <MenuItems
      class="divide-second-100 dark:bg-second-800 absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y rounded-md bg-white shadow-lg focus:outline-none dark:text-white"
      as="div"
    >
      <div class="py-1">
        <slot />
      </div>
    </MenuItems>
  </transition>
</template>

<script setup lang="ts">
import { MenuItems } from "@headlessui/vue";
</script>
