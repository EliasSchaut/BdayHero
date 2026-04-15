<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <h3
      class="text-second-900 text-base leading-7 font-semibold dark:text-white"
    >
      {{ $t('nav.shifts') }}
    </h3>
    <p
      class="text-second-500 dark:text-second-300 mt-1 max-w-2xl text-sm leading-6"
    >
      {{ $t('shifts.subtitle') }}
    </p>
  </div>
  <div
    class="border-second-100 dark:border-second-800 overflow-hidden border-t"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <table class="w-full text-left">
          <thead class="sr-only">
            <tr>
              <th></th>
              <th class="hidden sm:table-cell"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="shift in shifts" :key="shift.id">
              <tr class="text-second-900 dark:text-second-200 text-sm/6">
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
                    class="border-second-200 dark:border-second-700 bg-second-50 dark:bg-second-900 absolute inset-y-0 right-full -z-10 w-screen border-b"
                  />
                  <div
                    class="border-second-200 dark:border-second-700 bg-second-50 dark:bg-second-900 absolute inset-y-0 left-0 -z-10 w-screen border-b"
                  />
                </th>
              </tr>
              <tr v-for="(slot, index) in shift.slots" :key="slot.id">
                <td class="relative py-5 pr-6">
                  <div class="flex gap-x-6">
                    <div class="flex-auto">
                      <div class="flex items-start gap-x-3">
                        <div
                          class="text-second-900 dark:text-second-200 text-sm/6 font-medium"
                        >
                          {{ index + 1 }}.&nbsp;{{ $t('shifts.singular') }}
                        </div>
                        <Badge v-if="has_slot(slot.id)"
                          >{{ $t('shifts.assigned') }}
                        </Badge>
                        <Badge
                          v-if="
                            slot.assigned_guests &&
                            slot.assigned_guests.length >= slot.capacity
                          "
                          >{{ $t('shifts.full') }}
                        </Badge>
                      </div>
                      <div
                        class="text-second-500 dark:text-second-400 mt-1 text-xs/5"
                      >
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
                  <div class="mb-1 flex items-center justify-end gap-x-4">
                    <AvatarCloudStacked class="xs:hidden !-space-x-1">
                      <AvatarStacked
                        v-for="guest in slot.assigned_guests"
                        :initials="guest.initials!"
                        :title="
                          guest.first_name && guest.last_name
                            ? `${guest.first_name} ${guest.last_name}`
                            : guest.email
                        "
                        :href="guest.avatar_url"
                        small
                      />
                    </AvatarCloudStacked>
                    <div
                      v-if="slot.assigned_guests"
                      class="bg-second-100 dark:bg-second-800 mt-1 rounded-xl px-2 py-0.5 text-xs/5 text-gray-600 dark:text-gray-400"
                    >
                      {{ `${slot.assigned_guests.length}/${slot.capacity}` }}
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <nuxt-link
                      v-if="!auth.logged_in"
                      href="/guests"
                      class="text-prime-600 dark:text-prime-400 hover:text-prime-500 text-sm/6 font-medium hover:underline"
                    >
                      {{ $t('shifts.please_log_in') }}
                    </nuxt-link>
                    <ButtonLoading
                      v-else-if="has_slot(slot.id)"
                      @click="user_unassign_slot(Number(slot.id))"
                      :loading="loading"
                      class="text-prime-600 dark:text-prime-400 hover:text-prime-500 text-sm/6 font-medium"
                    >
                      {{ $t('shifts.unassign') }}
                    </ButtonLoading>
                    <ButtonLoading
                      v-else
                      @click="user_assign_slot(Number(slot.id))"
                      :loading="loading"
                      class="text-prime-600 dark:text-prime-400 hover:text-prime-500 text-sm/6 font-medium"
                    >
                      {{ $t('shifts.assign') }}
                    </ButtonLoading>
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
      loading: ref(false),
    };
  },
  mounted() {
    watch(() => this.$i18n.locale, this.refetch);
  },
  methods: {
    async refetch() {
      const { data: shifts_data } = await this.$apollo.query({
        query: shifts_query,
        fetchPolicy: 'no-cache',
      });
      this.shifts = shifts_data?.shifts ?? [];

      if (this.auth.logged_in) {
        const { data: assigned_data } = await this.$apollo.query({
          query: user_assigned_slots,
          fetchPolicy: 'no-cache',
        });
        this.assigned_slots =
          assigned_data.user?.assigned_slots?.map((slot: any) => slot.id) ?? [];
      }
    },
    async user_assign_slot(slot_id: number) {
      this.loading = true;
      await this.assign_slot({ id: slot_id });
      await this.refetch();
      this.loading = false;
    },
    async user_unassign_slot(slot_id: number) {
      this.loading = true;
      await this.unassign_slot({ id: slot_id });
      await this.refetch();
      this.loading = false;
    },
    has_slot(slot_id: number): boolean {
      return this.assigned_slots.includes(slot_id);
    },
  },
});
</script>
