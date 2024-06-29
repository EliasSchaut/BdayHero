<template>
  <div class="mx-auto my-24 flex justify-around space-x-4 px-4 align-middle">
    <img
      v-if="swapped"
      :class="[img_rounded_full ? 'rounded-full' : 'rounded-md', 'shadow-md']"
      :src="img_src"
      :alt="title"
    />
    <LayoutBlocktext :title="title">
      <slot />
    </LayoutBlocktext>
    <img
      v-if="!swapped"
      :class="[img_rounded_full ? 'rounded-full' : 'rounded-md', 'shadow-md']"
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
