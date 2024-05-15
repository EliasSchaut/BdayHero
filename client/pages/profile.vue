<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        Edit Profile
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        <FormVal
          class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          :submit="submit"
        >
          <FormInputName
            class="sm:col-span-3"
            id="first_name"
            :label="$t('sign_up.form.first_name')"
            placeholder="Max"
            :value="user.first_name"
            required
          />
          <FormInputName
            class="sm:col-span-3"
            id="last_name"
            :label="$t('sign_up.form.last_name')"
            placeholder="Mustermann"
            :value="user.last_name"
            required
          />
          <FormInputEmail
            class="sm:col-span-6"
            id="email"
            :side_label="{ label: $t('common.form.optional') }"
            :value="user.email"
            show_label
          />
          <div class="space-y-5 sm:col-span-6">
            <FormCheckbox
              id="public"
              :label="$t('sign_up.form.public.label')"
              :desc="$t('sign_up.form.public.desc')"
              :value="user.public ? 'on' : 'off'"
            />
            <FormCheckbox
              id="has_bed"
              :label="$t('sign_up.form.has_bed.label')"
              :desc="$t('sign_up.form.has_bed.desc')"
              :value="user.has_bed ? 'on' : 'off'"
            />
            <FormCheckbox
              id="need_bed"
              :label="$t('sign_up.form.need_bed.label')"
              :desc="$t('sign_up.form.need_bed.desc')"
              :value="user.need_bed ? 'on' : 'off'"
            />
            <FormCheckbox
              id="nerd"
              :label="$t('sign_up.form.nerd.label')"
              :desc="$t('sign_up.form.nerd.desc')"
              :value="user.nerd ? 'on' : 'off'"
            />
            <FormCheckbox
              id="vegan"
              :label="$t('sign_up.form.vegan.label')"
              :desc="$t('sign_up.form.vegan.desc')"
              :value="user.vegan ? 'on' : 'off'"
            />
          </div>
          <FormSubmit
            class="bg-indigo-500 dark:bg-indigo-600 sm:col-span-6"
            label="Update"
          />
        </FormVal>

        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div
              class="relative flex justify-center text-sm font-medium leading-6"
            >
              <span
                class="bg-white px-6 text-gray-900 dark:bg-gray-800 dark:text-white"
                >Login Link</span
              >
            </div>
          </div>
          <div class="mt-6 text-center">
            <LinkUnderlined
              :href="`https://bday.schaut.dev/login/${user.login_challenge}`"
              :value="`https://bday.schaut.dev/login/${user.login_challenge}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { alertStore } from '~/store/alert';
import { authStore } from '~/store/auth';

export default defineComponent({
  setup() {
    const user_query = gql`
      query {
        user {
          id
          email
          first_name
          last_name
          public
          has_bed
          need_bed
          nerd
          vegan
          is_admin
          mail_verified
          login_challenge
          mail_challenge
        }
      }
    `;

    const { result: user } = useQuery(user_query);
    return {
      alert: alertStore(),
      auth: authStore(),
      user,
    };
  },
  methods: {
    submit(e: Event, form_data: FormData) {},
  },
});
</script>
