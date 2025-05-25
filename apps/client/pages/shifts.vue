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
                        <Badge v-if="has_slot(slot.id)">Übernommen</Badge>
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
                <td v-if="slot.assigned_guests" class="xs:table-cell hidden">
                  <AvatarCloudStacked>
                    <AvatarStacked
                      v-for="guest in slot.assigned_guests"
                      :initials="guest.initials!"
                      :title="
                        guest.first_name && guest.last_name
                          ? `${guest.first_name} ${guest.last_name}`
                          : guest.email
                      "
                      :href="guest.avatar_url"
                    />
                  </AvatarCloudStacked>
                </td>
                <td class="py-5 text-right">
                  <div
                    class="xs:mb-0 mb-1 flex items-center justify-end gap-x-4"
                  >
                    <AvatarCloudStacked class="xs:hidden !-space-x-1">
                      <AvatarStacked
                        class="!size-6"
                        v-for="guest in slot.assigned_guests"
                        :initials="guest.initials!"
                        :title="
                          guest.first_name && guest.last_name
                            ? `${guest.first_name} ${guest.last_name}`
                            : guest.email
                        "
                        :href="guest.avatar_url"
                      />
                    </AvatarCloudStacked>
                    <div
                      v-if="slot.assigned_guests"
                      class="bg-second-100 mt-1 rounded-xl px-2 py-0.5 text-xs/5 text-gray-600"
                    >
                      {{ `${slot.assigned_guests.length}/${slot.capacity}` }}
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <nuxt-link
                      v-if="!auth.logged_in"
                      href="/guests"
                      class="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                    >
                      Bitte anmelden
                    </nuxt-link>
                    <button
                      v-else-if="has_slot(slot.id)"
                      @click="user_unassign_slot(Number(slot.id))"
                      class="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Abgeben
                    </button>
                    <button
                      v-else
                      @click="user_assign_slot(Number(slot.id))"
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
import type { GuestModel, ShiftModel, SlotModel } from '@bdayhero/shared';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const shifts_query = gql`
  query {
    shifts {
      id
      name
      desc
      slots {
        id
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

const user_assigned_slots = gql`
  query {
    user {
      assigned_slots {
        id
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
    const auth = authStore();
    const shifts = ref<ShiftModel[]>([]);
    const assigned_slots = ref<number[]>([]);
    const { mutate: assign_slot } = useMutation<SlotModel>(assign_slot_query);
    const { mutate: unassign_slot } =
      useMutation<SlotModel>(unassign_slot_query);

    useAsyncQuery<{ shifts: ShiftModel[] }>(shifts_query).then(({ data }) => {
      shifts.value = data.value?.shifts ?? [];
    });

    if (auth.logged_in) {
      useAsyncQuery<{ user: GuestModel }>(user_assigned_slots).then(
        ({ data }) => {
          assigned_slots.value =
            data.value?.user?.assigned_slots?.map((slot) => slot.id) ?? [];
        },
      );
    }

    return {
      auth,
      shifts,
      assign_slot,
      unassign_slot,
      assigned_slots,
    };
  },
  methods: {
    async refetch() {
      useAsyncQuery<{ shifts: ShiftModel[] }>(shifts_query).then(({ data }) => {
        shifts.value = data.value?.shifts ?? [];
      });

      if (auth.logged_in) {
        useAsyncQuery<{ user: GuestModel }>(user_assigned_slots).then(
          ({ data }) => {
            assigned_slots.value =
              data.value?.user?.assigned_slots?.map((slot) => slot.id) ?? [];
          },
        );
      }
    },
    async user_assign_slot(slot_id: number) {
      await this.assign_slot({ id: slot_id });
    },
    async user_unassign_slot(slot_id: number) {
      await this.unassign_slot({ id: slot_id });
    },
    has_slot(slot_id: number): boolean {
      return this.assigned_slots.includes(slot_id);
    },
  },
});
</script>
