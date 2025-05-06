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
      >{{ $t('guestlist.countup.tail') }}!</span
    >
  </div>

  <div class="flex justify-center">
    <div
      class="bg-second-50 mx-12 flex min-h-96 min-w-96 items-center justify-center rounded-4xl p-8 inset-shadow-sm"
    >
      <FormVal v-if="auth.logged_in" :submit="() => {}">
        <h3 class="text-center font-semibold">Sign in to join!</h3>
        <FormInputEmail id="mail" class="my-4" />
        <FormSubmit>Sign in</FormSubmit>
      </FormVal>

      <FormVal v-else class="flex flex-col gap-y-6" :submit="() => {}">
        <div class="flex justify-end">
          <button class="hover:bg-second-100 rounded-md p-2">
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
          <div class="flex gap-x-4">
            <Avatar initials="ES" />
            <FormInputEmail
              class="w-full opacity-80"
              id="email"
              value="elias@schaut.dev"
              disabled
            />
          </div>
          <FormInputName
            id="first_name"
            label="Vorname"
            placeholder="Alexander"
          />
          <FormInputName
            id="last_name"
            label="Nachname"
            placeholder="Hamilton"
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
              <option :value="0">+0</option>
              <option :value="1">+1</option>
            </FormSelect>
          </div>
          <FormInputName
            v-for="i in num_companions"
            :key="i"
            :id="'companion' + i"
            placeholder="Max Mustermann"
            label="+1 Name"
            required
          />
          <Divider class="my-2" />
          <FormInput placeholder="Nachricht hinzufügen (optional)" />
        </div>

        <FormSubmit>Aktualisieren</FormSubmit>
      </FormVal>
    </div>
  </div>

  <AvatarCloud class="mt-16">
    <AvatarProfile
      v-for="i in Array(99).fill(0)"
      initials="ES"
      full_name="Elias Schaut"
      note="Yoooo lets goo!"
      href=""
    />
  </AvatarCloud>
</template>

<script lang="ts">
import { authStore } from '~/store/auth';
import { Bars3Icon } from '@heroicons/vue/24/outline';

enum AttendanceStatus {
  NOT_RESPONDED = -1,
  ATTENDING = 0,
  NOT_ATTENDING = 1,
  MAYBE_ATTENDING = 2,
}

export default defineComponent({
  components: { Bars3Icon },
  setup() {
    return {
      AttendanceStatus,
      selected_attendance_status: ref(AttendanceStatus.NOT_RESPONDED),
      num_companions: ref<number>(0),
      auth: authStore(),
    };
  },
  mounted() {
    this.$refs.count_up.start(99);
  },
});
</script>
