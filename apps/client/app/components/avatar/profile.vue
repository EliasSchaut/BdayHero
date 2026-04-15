<template>
  <div
    :class="{
      'm-2 block shrink-0 rounded-xl p-2': true,
      'bg-green-50 dark:bg-green-950':
        attendance_status === AttendanceStatus.ATTENDING,
      'bg-yellow-50 dark:bg-yellow-950':
        attendance_status === AttendanceStatus.MAYBE_ATTENDING,
      'bg-red-50 dark:bg-red-950':
        attendance_status === AttendanceStatus.NOT_ATTENDING,
    }"
  >
    <div class="flex items-center">
      <Avatar :href="href" :initials="initials" />
      <div v-if="!only_avatar" class="ml-3">
        <div
          v-if="first_name && last_name"
          class="xs:flex-row flex flex-col flex-wrap gap-x-1"
        >
          <span
            class="text-second-700 dark:text-second-300 text-sm font-medium"
          >
            {{ first_name }}
          </span>
          <span
            class="text-second-700 dark:text-second-300 text-sm font-medium"
          >
            {{ last_name }}
          </span>
        </div>
        <div
          v-else
          class="text-second-700 dark:text-second-300 text-sm font-medium"
        >
          {{ email }}
        </div>
        <p v-if="note" class="text-second-500 text-xs font-medium">
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
import { AttendanceStatus } from '@bdayhero/shared';

defineProps({
  email: {
    type: String,
    required: true,
  },
  initials: {
    type: String,
    default: '',
  },
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  note: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  attendance_status: {
    type: Number,
    default: AttendanceStatus.NOT_RESPONDED,
  },
  companions: {
    type: Array<{ name: string }>,
    default: [],
  },
  only_avatar: {
    type: Boolean,
    default: false,
  },
});
</script>
