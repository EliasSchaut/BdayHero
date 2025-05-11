<template>
  <div
    class="m-auto flex h-min w-min flex-col justify-center space-y-12 text-center align-middle font-semibold"
  >
    <Countup
      id="guestlist_countup"
      class="m-auto my-16 w-min text-4xl font-bold opacity-0"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 3 }"
      :hovered="{ scale: 3.5 }"
      :delay="1000"
      :duration="3000"
      ref="count_up"
    />
    <span
      class="mb-20 text-3xl font-semibold text-nowrap opacity-0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="1200"
      >{{ $t("guestlist.countup.tail") }}!</span
    >
  </div>

  <div class="flex justify-center">
    <div
      class="bg-second-50 mx-12 flex min-h-96 min-w-96 items-center justify-center rounded-4xl p-8 inset-shadow-sm"
    >
      <FormVal v-if="!auth.logged_in" :submit="on_submit_sign_in">
        <h3 class="text-center font-semibold">Sign in to join!</h3>
        <FormInputEmail id="email" class="my-4" required />
        <FormSubmit>Sign in</FormSubmit>
      </FormVal>

      <FormVal
        v-else-if="user"
        class="flex flex-col gap-y-6"
        :submit="on_submit_user_update"
      >
        <div class="flex justify-end">
          <button class="hover:bg-second-100 rounded-md p-2" type="button">
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>
        <FormRadioGroup v-model="selected_attendance_status" required>
          <FormRadioGroupOption
            :value="AttendanceStatus.ATTENDING"
            :checked="selected_attendance_status == AttendanceStatus.ATTENDING"
          >
            <ButtonCheck
              :solid="selected_attendance_status == AttendanceStatus.ATTENDING"
              >Zusage
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
              >Vielleicht
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
              >Absage
            </ButtonX>
          </FormRadioGroupOption>
        </FormRadioGroup>
        <div
          class="bg-second-100 flex flex-col gap-y-2 rounded-lg p-4 inset-shadow-sm"
        >
          <div class="flex gap-x-4 justify-between">
            <Avatar
              :href="user.avatar_url"
              :initials="user.initials!"
              class="hover:cursor-not-allowed"
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
            label="Vorname"
            :value="user?.first_name"
            placeholder="Alexander"
            :minlength="2"
            :maxlength="20"
          />
          <FormInputName
            id="last_name"
            label="Nachname"
            :value="user?.last_name"
            placeholder="Hamilton"
            :minlength="2"
            :maxlength="20"
          />
          <DividerPlus class="mt-2" />
          <div class="flex items-center justify-between">
            <span>Weitere Gäste</span>
            <FormSelect
              id="guests"
              @update="
                (n: number) => {
                  num_companions = n;
                }
              "
            >
              <option :value="0" :selected="num_companions == 0">+0</option>
              <option :value="1" :selected="num_companions == 1">+1</option>
            </FormSelect>
          </div>
          <FormInputName
            v-for="i in num_companions"
            :key="i"
            :id="`companion-${i}`"
            :value="i - 1 < companions.length ? companions[i - 1].name : ''"
            placeholder="Max Mustermann"
            :label="`${i}. Companion Name`"
            :minlength="2"
            :maxlength="20"
            required
          />
          <Divider class="my-2" />
          <FormInput
            id="bio"
            type="text"
            placeholder="Nachricht hinzufügen (optional)"
            :maxlength="20"
            :value="user.bio"
          />
        </div>

        <FormSubmit>Aktualisieren</FormSubmit>
      </FormVal>
    </div>
  </div>

  <HeadingItalic class="my-10" title="Gästeliste" />
  <AvatarCloud>
    <AvatarProfile
      v-for="guest in guests"
      :initials="guest.initials!"
      :full_name="`${guest.first_name} ${guest.last_name}`"
      :note="guest.bio"
      :href="guest.avatar_url"
    />
  </AvatarCloud>
</template>

<script lang="ts">
import type {
  CompanionModel,
  GuestModel,
  GuestUpdateInputModel,
} from "@bdayhero/shared";
import { AttendanceStatus } from "@bdayhero/shared";
import { authStore } from "~/store/auth";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { alertStore } from "~/store/alert";

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
type UserUpdateResult = { user_update: GuestModel };

export default defineComponent({
  components: { Bars3Icon },
  setup() {
    const { mutate: sign_in_request } = useMutation(sign_in_request_query);
    const { mutate: user_update } =
      useMutation<UserUpdateResult>(user_update_mutation);
    const auth = authStore();
    let guests: Ref<Array<GuestModel>> = ref([]);
    let user: Ref<GuestModel | null> = ref(null);
    let companions: Ref<CompanionModel[]> = ref([]);
    let num_companions: Ref<number> = ref(0);
    let selected_attendance_status: Ref<AttendanceStatus> = ref(
      AttendanceStatus.NOT_RESPONDED,
    );

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
      num_companions,
      companions,
      selected_attendance_status,
      AttendanceStatus,
      alert: alertStore(),
      sign_in_request,
      user_update,
      guests,
      auth,
      user,
    };
  },
  mounted() {
    this.$refs.count_up.start(99);
  },
  methods: {
    async on_submit_sign_in(e: Event, form_data: FormData) {
      const email = form_data.get("email");
      try {
        const data = await this.sign_in_request({ email });
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
    async on_submit_user_update(e: Event, form_data: FormData) {
      const user_update_payload = {
        first_name: form_data.get("first_name")! as string,
        last_name: form_data.get("last_name")! as string,
        attendance_status: this.selected_attendance_status,
        bio: form_data.get("bio")! as string,
        profile_public: true,
      } as GuestUpdateInputModel;
      const data = await this.user_update({
        user_update_input_data: user_update_payload,
      });
      if (data?.data?.user_update) {
        this.user!.avatar_url = data?.data?.user_update?.avatar_url;
        this.user!.initials = data?.data?.user_update?.initials;
        this.alert.show("Update successfull", "success");
      }
    },
  },
});
</script>
