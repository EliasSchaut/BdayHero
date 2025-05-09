<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="text-second-900 block text-sm/6 font-medium"
      >{{ label }}</label
    >
    <div class="grid grid-cols-1">
      <select
        :id="id"
        :name="id"
        @change="
          (e: Event) => {
            $emit('update', Number(e.target.value));
          }
        "
        class="text-second-900 outline-second-300 focus:outline-prime-600 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
      >
        <slot />
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['update']);

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
});
</script>
