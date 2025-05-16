<template>
  <div
    :class="{
      'm-2 block shrink-0 p-2 rounded-xl': true,
      'bg-green-50': attendance_status === AttendanceStatus.ATTENDING,
      'bg-amber-50': attendance_status === AttendanceStatus.MAYBE_ATTENDING,
      'bg-red-50': attendance_status === AttendanceStatus.NOT_ATTENDING,
    }"
  >
    <div class="flex items-center">
      <Avatar :href="href" :initials="initials" />
      <div class="ml-3">
        <div
          v-if="first_name && last_name"
          class="flex flex-col xs:flex-row flex-wrap gap-x-1"
        >
          <span class="text-sm font-medium text-second-700">
            {{ first_name }}
          </span>
          <span class="text-sm font-medium text-second-700">
            {{ last_name }}
          </span>
        </div>
        <div v-else class="text-sm font-medium text-second-700">
          {{ email }}
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
import { AttendanceStatus } from "@bdayhero/shared";

defineProps({
  initials: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
});
</script>
