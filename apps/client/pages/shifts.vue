<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <h3
      class="text-second-900 text-base leading-7 font-semibold dark:text-white"
    >
      Schichten
    </h3>
    <p
      class="text-second-500 dark:text-second-300 mt-1 max-w-2xl text-sm leading-6"
    >
      Trage dich hier für Schichten ein
    </p>
  </div>
  <div class="border-second-100 overflow-hidden border-t">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <table class="w-full text-left">
          <thead class="sr-only">
            <tr>
              <th>Description</th>
              <th class="hidden sm:table-cell">Capacity</th>
              <th>Übernehmen</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="shift in shifts" :key="shift.id">
              <tr class="text-second-900 text-sm/6">
                <th
                  scope="colgroup"
                  colspan="3"
                  class="relative isolate py-2 font-semibold"
                >
                  <span class="justify-left flex items-baseline gap-x-3">
                    <span class="text-lg font-semibold">{{ shift.name }}</span>
                    <span class="text-sm font-normal italic">
                      {{ shift.desc }}
                    </span>
                  </span>
                  <div
                    class="border-second-200 bg-second-50 absolute inset-y-0 right-full -z-10 w-screen border-b"
                  />
                  <div
                    class="border-second-200 bg-second-50 absolute inset-y-0 left-0 -z-10 w-screen border-b"
                  />
                </th>
              </tr>
              <tr v-for="(slot, index) in shift.slots" :key="slot.id">
                <td class="relative py-5 pr-6">
                  <div class="flex gap-x-6">
                    <div class="flex-auto">
                      <div class="flex items-start gap-x-3">
                        <div class="text-second-900 text-sm/6 font-medium">
                          {{ index + 1 }}. Schicht
                        </div>
                        <Badge
                          v-if="
                            slot.assigned_guests &&
                            slot.assigned_guests.length >= slot.capacity
                          "
                          >Voll
                        </Badge>
                      </div>
                      <div class="text-second-500 mt-1 text-xs/5">
                        <time :datetime="$dayjs(slot.start).toString()"
                          >{{ $dayjs(slot.start).format('HH:mm') }}
                        </time>
                        <span>&nbsp;&#8209;&nbsp;</span>
                        <time :datetime="$dayjs(slot.end).toString()"
                          >{{ $dayjs(slot.end).format('HH:mm') }}
                        </time>
                      </div>
                    </div>
                  </div>
                </td>
                <td v-if="slot.assigned_guests">
                  <AvatarCloud>
                    <AvatarProfile
                      v-for="guest in slot.assigned_guests"
                      :initials="guest.initials!"
                      :email="guest.email"
                      :first_name="guest.first_name"
                      :last_name="guest.last_name"
                      :href="guest.avatar_url"
                      only_avatar
                    />
                  </AvatarCloud>
                </td>
                <td class="py-5 text-right">
                  <div
                    v-if="slot.assigned_guests"
                    class="mt-1 text-xs/5 text-gray-500"
                  >
                    {{ `${slot.assigned_guests.length}/${slot.capacity}` }}
                  </div>
                  <div class="flex justify-end">
                    <button
                      class="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      übernehmen
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { authStore } from '~/store/auth';
import type { ShiftModel, SlotModel } from '@bdayhero/shared';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const shifts_query = gql`
  query {
    shifts {
      id
      name
      desc
      slots {
        start
        end
        capacity
        assigned_guests {
          id
          email
          first_name
          last_name
          initials
          avatar_url
        }
      }
    }
  }
`;

const assign_slot_query = gql`
  mutation assign_slot($id: Int!) {
    slot_assign(slot_id_input: { id: $id }) {
      assigned_guests {
        id
      }
    }
  }
`;

const unassign_slot_query = gql`
  mutation unassign_slot($id: Int!) {
    slot_unassign(slot_id_input: { id: $id }) {
      assigned_guests {
        id
      }
    }
  }
`;

export default defineComponent({
  components: {
    XCircleIcon,
  },
  setup() {
    const shifts = ref<ShiftModel[]>([]);
    const { mutate: assign_slot } = useMutation<SlotModel>(assign_slot_query);
    const { mutate: unassign_slot } =
      useMutation<SlotModel>(unassign_slot_query);

    useAsyncQuery<{ shifts: ShiftModel[] }>(shifts_query).then(({ data }) => {
      shifts.value = data.value?.shifts ?? [];
    });

    return {
      auth: authStore(),
      shifts,
      assign_slot,
      unassign_slot,
    };
  },
  methods: {
    async user_assign_slot(slot_id: number) {
      this.assign_slot({ id: slot_id });
    },
    async user_unassign_slot(slot_id: number) {
      this.unassign_slot({ id: slot_id });
    },
  },
});
</script>
