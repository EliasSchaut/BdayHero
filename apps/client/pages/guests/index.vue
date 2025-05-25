<template>
  <div
    class="m-auto flex h-min w-min flex-col justify-center space-y-12 text-center align-middle font-semibold"
  >
    <Countup
      id="guestlist_countup"
      :class="{
        hidden: guests_count == 0,
        'm-auto my-16 w-min text-4xl font-bold opacity-0': true,
      }"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 3 }"
      :delay="1000"
      :duration="3000"
      ref="count_up"
    />
    <Spinner v-if="guests_count == 0" class="mx-auto my-16" />
    <span
      class="text-3xl font-semibold text-nowrap opacity-0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="1200"
      >{{ $t('guests.countup.tail') }}!</span
    >
  </div>

  <div class="mt-20 flex justify-center">
    <div
      class="bg-second-50 dark:bg-second-900 xs:mx-12 xs:w-fit xs:min-w-96 xs:rounded-4xl flex min-h-96 w-full items-center justify-center p-8 inset-shadow-sm"
    >
      <FormVal
        class="mx-4 w-full"
        v-if="!auth.logged_in"
        :submit="on_submit_sign_in"
      >
        <h3 class="text-center font-semibold">
          {{ $t('guests.signin.title') }}
        </h3>
        <div class="my-4 flex w-full flex-col gap-y-1">
          <ButtonSigninGoogle @click="on_google_sign_in" type="button" />
          <ButtonSigninGithub @click="on_github_sign_in" type="button" />
          <ButtonSigninDiscord @click="on_discord_sign_in" type="button" />
          <FormInputEmail
            id="email"
            :placeholder="$t('guests.signin.via_local')"
            required
          />
        </div>
        <FormSubmit>{{ $t('guests.signin.submit') }}</FormSubmit>
      </FormVal>
      <FormVal
        v-else-if="user"
        class="flex flex-col gap-y-6"
        :submit="on_submit_user_update"
      >
        <div class="flex justify-end">
          <Dropdown
            class="hover:bg-second-100 dark:hover:bg-second-800 rounded-md p-2"
            type="button"
          >
            <DropdownButton>
              <Bars3Icon class="h-6 w-6" />
            </DropdownButton>
            <DropdownMenu>
              <DropdownMenuItem @click="user_delete"
                >{{ $t('guests.profile.delete_account') }}
              </DropdownMenuItem>
              <DropdownMenuItem @click="user_logout"
                >{{ $t('guests.profile.logout') }}
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <FormRadioGroup v-model="selected_attendance_status" required>
          <FormRadioGroupOption
            :value="AttendanceStatus.ATTENDING"
            :checked="selected_attendance_status == AttendanceStatus.ATTENDING"
          >
            <ButtonCheck
              :solid="selected_attendance_status == AttendanceStatus.ATTENDING"
              >{{ $t('guests.profile.attendance.attending') }}
            </ButtonCheck>
          </FormRadioGroupOption>
          <FormRadioGroupOption
            :value="AttendanceStatus.MAYBE_ATTENDING"
            :checked="
              selected_attendance_status == AttendanceStatus.MAYBE_ATTENDING
            "
          >
            <ButtonQuestion
              :solid="
                selected_attendance_status == AttendanceStatus.MAYBE_ATTENDING
              "
              >{{ $t('guests.profile.attendance.maybe') }}
            </ButtonQuestion>
          </FormRadioGroupOption>
          <FormRadioGroupOption
            :value="AttendanceStatus.NOT_ATTENDING"
            :checked="
              selected_attendance_status == AttendanceStatus.NOT_ATTENDING
            "
          >
            <ButtonX
              :solid="
                selected_attendance_status == AttendanceStatus.NOT_ATTENDING
              "
              >{{ $t('guests.profile.attendance.not_attending') }}
            </ButtonX>
          </FormRadioGroupOption>
        </FormRadioGroup>
        <div
          class="bg-second-100 dark:bg-second-800 flex flex-col gap-y-2 rounded-lg p-4 inset-shadow-sm"
        >
          <div class="flex w-full justify-between gap-x-4">
            <Avatar
              :href="user.avatar_url"
              :initials="user.initials!"
              class="xs:size-9 size-10 hover:cursor-not-allowed"
            />
            <FormInputEmail
              class="opacity-80 hover:cursor-not-allowed"
              id="email"
              :value="user.email"
              disabled
            />
          </div>
          <FormInputName
            id="first_name"
            :label="$t('common.form.labels.first_name')"
            :value="user?.first_name"
            placeholder="Alexander"
            :minlength="2"
            :maxlength="20"
          />
          <FormInputName
            id="last_name"
            :label="$t('common.form.labels.last_name')"
            :value="user?.last_name"
            placeholder="Hamilton"
            :minlength="2"
            :maxlength="20"
          />
          <DividerText>{{ $t('guests.profile.options.title') }}</DividerText>
          <div
            class="text-second-800 dark:text-second-300 flex flex-col gap-y-2 font-medium"
          >
            <div class="flex justify-between">
              <span>{{ $t('guests.profile.options.public') }}</span>
              <FormSwitch id="profile_public" :enabled="user.profile_public" />
            </div>
            <div class="flex justify-between">
              <span>{{ $t('guests.profile.options.needs_bed') }}</span>
              <FormSwitch id="need_bed" :enabled="user.need_bed" />
            </div>
            <div class="flex justify-between">
              <span>{{ $t('guests.profile.options.has_bed') }}</span>
              <FormSwitch id="has_bed" :enabled="user.has_bed" />
            </div>
            <div class="flex justify-between">
              <span>{{ $t('guests.profile.options.vegan') }}</span>
              <FormSwitch id="is_vegan" :enabled="user.is_vegan" />
            </div>
          </div>

          <DividerPlus class="mt-2" />
          <div class="flex items-center justify-between">
            <span>{{ $t('guests.profile.companions.title') }}</span>
            <FormSelect
              id="guests"
              @update="
                (n: number) => {
                  num_companions = n;
                }
              "
            >
              <option
                v-for="i in max_companions_per_guest + 1"
                :value="i - 1"
                :selected="num_companions == i - 1"
              >
                +{{ i - 1 }}
              </option>
            </FormSelect>
          </div>
          <FormInputName
            v-for="i in num_companions"
            :key="i"
            id="companions"
            :value="i - 1 < companions.length ? companions[i - 1].name : ''"
            placeholder="Eliza Hamilton"
            :label="`${i}. ${$t('guests.profile.companions.name')}`"
            :minlength="2"
            :maxlength="20"
            required
          />
          <Divider class="my-2" />
          <FormInput
            id="bio"
            type="text"
            :placeholder="$t('guests.profile.note')"
            :maxlength="20"
            :value="user.bio"
          />
        </div>

        <FormSubmit>{{ $t('guests.profile.update') }}</FormSubmit>
      </FormVal>
      <Spinner v-else class="h-12 w-12" />
    </div>
  </div>

  <HeadingItalic class="my-10" :title="$t('guests.list.title')" />
  <AvatarCloud v-if="guests.length">
    <AvatarProfile
      v-for="guest in guests"
      :class="{ hidden: !guest.profile_public }"
      :initials="guest.initials!"
      :email="guest.email"
      :first_name="guest.first_name"
      :last_name="guest.last_name"
      :note="guest.bio"
      :href="guest.avatar_url"
      :attendance_status="guest.attendance_status"
      :companions="guest.companions ?? []"
    />
  </AvatarCloud>
  <Spinner v-else class="mx-auto" />
</template>

<script lang="ts">
import type {
  CompanionModel,
  GuestModel,
  GuestUpdateInputModel,
} from '@bdayhero/shared/index';
import { AttendanceStatus } from '@bdayhero/shared/index';
import { authStore } from '~/store/auth';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { alertStore } from '~/store/alert';
import { generate_oauth_uri } from '~/utils/oauth';

const guests_count_query = gql`
  query {
    users_count
  }
`;
type GuestsCountResult = { users_count: number };

const guest_list_query = gql`
  query {
    users {
      email
      first_name
      last_name
      initials
      bio
      avatar_url
      profile_public
      attendance_status
      companions {
        name
      }
    }
  }
`;
type GuestsResult = { users: GuestModel[] };

const sign_in_request_query = gql`
  mutation sign_in_request($email: String!) {
    auth_sign_request_local(user_mail_input: { email: $email })
  }
`;

const user_query = gql`
  query {
    user {
      email
      first_name
      last_name
      initials
      bio
      avatar_url
      profile_public
      has_bed
      need_bed
      is_vegan
      attendance_status
      companions {
        name
      }
    }
  }
`;
type UserResult = { user: GuestModel };

const user_update_mutation = gql`
  mutation user_update($user_update_input_data: GuestUpdateInputModel!) {
    user_update(user_update_input_data: $user_update_input_data) {
      email
      first_name
      last_name
      initials
      bio
      avatar_url
      profile_public
      has_bed
      need_bed
      is_vegan
      attendance_status
      companions {
        name
      }
    }
  }
`;
type UserUpdateResult = { user_update: GuestModel };

const user_delete_mutation = gql`
  mutation {
    user_delete {
      id
    }
  }
`;

export default defineComponent({
  components: { Bars3Icon },
  setup() {
    const { mutate: sign_in_request } = useMutation(sign_in_request_query);
    const { mutate: user_update } =
      useMutation<UserUpdateResult>(user_update_mutation);
    const config = useRuntimeConfig();
    const auth = authStore();
    const alert = alertStore();
    const guests_count: Ref<number> = ref(0);
    const guests: Ref<Array<GuestModel>> = ref([]);
    const user: Ref<GuestModel | null> = ref(null);
    const companions: Ref<CompanionModel[]> = ref([]);
    const num_companions: Ref<number> = ref(0);
    const selected_attendance_status: Ref<AttendanceStatus> = ref(
      AttendanceStatus.NOT_RESPONDED,
    );

    useAsyncQuery<GuestsCountResult>(guests_count_query).then(({ data }) => {
      guests_count.value = data?.value?.users_count ?? 0;
    });
    useAsyncQuery<GuestsResult>(guest_list_query).then(({ data }) => {
      guests.value = data?.value?.users ?? [];
    });

    if (auth.logged_in) {
      useAsyncQuery<UserResult>(user_query).then(({ data }) => {
        user.value = data.value?.user ?? null;
        num_companions.value = user.value?.companions?.length ?? 0;
        companions.value = user.value?.companions ?? [];
        selected_attendance_status.value =
          user.value?.attendance_status ?? AttendanceStatus.NOT_RESPONDED;
      });
    }

    return {
      alert,
      AttendanceStatus,
      guests_count,
      num_companions,
      companions,
      selected_attendance_status,
      sign_in_request,
      user_update,
      guests,
      auth,
      user,
      config,
      max_companions_per_guest: Number(config.public.max_companions_per_guest),
    };
  },
  mounted() {
    watch(
      () => this.guests_count,
      (value) => {
        this.$refs.count_up.start(value);
      },
    );
  },
  methods: {
    async refetch() {
      this.$apollo
        .query({ query: guest_list_query, fetchPolicy: 'no-cache' })
        .then(({ data }: any) => {
          this.guests = data?.users ?? [];
        });
    },
    async on_submit_sign_in(e: Event, form_data: FormData) {
      const email = form_data.get('email');
      try {
        await this.sign_in_request({ email });
        this.alert.show(
          'Du hast eine Mail bekommen. Klicke auf den Link in dieser um dich zu verifizieren',
          'success',
        );
      } catch (e) {
        this.alert.show(
          'Etwas hat nicht funktioniert! versuche es später noch einmal',
          'danger',
        );
      }
    },
    async on_google_sign_in() {
      const { google_client_id } = this.config.public;
      window.location.href = generate_oauth_uri({
        name: 'google',
        client_id: google_client_id,
        endpoint: 'https://accounts.google.com/o/oauth2/auth',
        scope: 'email',
      });
    },
    async on_github_sign_in() {
      const { github_client_id } = this.config.public;
      window.location.href = generate_oauth_uri({
        name: 'github',
        client_id: github_client_id,
        endpoint: 'https://github.com/login/oauth/authorize',
        scope: '[read:user,user:email]',
      });
    },
    async on_discord_sign_in() {
      const { discord_client_id } = this.config.public;
      window.location.href = generate_oauth_uri({
        name: 'discord',
        client_id: discord_client_id,
        endpoint: 'https://discord.com/oauth2/authorize',
        scope: 'identify email',
      });
    },
    async on_submit_user_update(e: Event, form_data: FormData) {
      const user_update_payload = {
        first_name: get_field_value_or_undefined(form_data, 'first_name'),
        last_name: get_field_value_or_undefined(form_data, 'last_name'),
        attendance_status: this.selected_attendance_status,
        companions: form_data.getAll('companions').map((comp) => {
          return { name: comp };
        }),
        bio: get_field_value_or_undefined(form_data, 'bio'),
        profile_public: form_data.get('profile_public')! == 'on',
        has_bed: form_data.get('has_bed')! == 'on',
        need_bed: form_data.get('need_bed')! == 'on',
        is_vegan: form_data.get('is_vegan')! == 'on',
      } as GuestUpdateInputModel;
      const data = await this.user_update({
        user_update_input_data: user_update_payload,
      });
      if (data?.data?.user_update) {
        this.user = data.data.user_update;
        this.num_companions = data.data.user_update.companions?.length ?? 0;
        this.companions = data.data.user_update.companions ?? [];
        this.selected_attendance_status =
          data.data.user_update.attendance_status ??
          AttendanceStatus.NOT_RESPONDED;
        this.refetch();
      }
    },
    user_logout() {
      this.auth.logout();
    },
    async user_delete() {
      if (
        confirm(
          'Bist du dir sicher, dass du deinen Account unwiderruflich löschen möchtest',
        )
      ) {
        const { mutate: delete_user } = useMutation(user_delete_mutation);
        await delete_user();
        this.user_logout();
      }
    },
  },
});
</script>
