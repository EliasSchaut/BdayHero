<template>
  <div class="m-4 block shrink-0">
    <div class="flex items-center">
      <Avatar :href="href" :initials="initials" />
      <div class="ml-3">
        <div class="flex flex-col xs:flex-row flex-wrap gap-x-1">
          <span class="text-sm font-medium text-second-700">
            {{ first_name }}
          </span>
          <span class="text-sm font-medium text-second-700">
            {{ last_name }}
          </span>
        </div>
        <p v-if="note" class="text-xs font-medium text-second-500">
          {{ note }}
        </p>
      </div>
      <Badge
        class="mx-2"
        :title="companions.map((comp) => comp.name).join(', ')"
        v-if="companions.length > 0"
      >
        +{{ companions.length }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  initials: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  companions: {
    type: Array<{ name: string }>,
    default: [],
  },
});
</script>
