<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    colspan?: number;
  }>(),
  {
    colspan: 1,
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TableRow>
    <TableCell
      :class="
        cn(
          'whitespace-nowrap p-4 align-middle text-sm text-gray-950 dark:text-gray-50',
          props.class,
        )
      "
      v-bind="delegatedProps"
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
