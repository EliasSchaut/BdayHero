<template>
  <span class="text-orange-500">
    {{ content }}
  </span>
</template>

<script lang="ts" setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>