<template>
  <div
    :class="[
      swapped ? 'lg:flex-row-reverse' : '',
      'mx-auto my-24 flex flex-wrap-reverse justify-around space-y-3 px-4 align-middle lg:flex-nowrap',
    ]"
  >
    <LayoutBlocktext :title="title" class="lg:mx-2">
      <slot />
    </LayoutBlocktext>
    <img
      :class="[
        img_rounded_full ? 'rounded-full' : 'rounded-md',
        'w-max-1/2 object-contain shadow-md lg:mx-2',
      ]"
      :src="img_src"
      :alt="title"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  img_src: {
    type: String,
    required: true,
  },
  img_rounded_full: {
    type: Boolean,
    default: false,
  },
  swapped: {
    type: Boolean,
    default: false,
  },
});
</script>
