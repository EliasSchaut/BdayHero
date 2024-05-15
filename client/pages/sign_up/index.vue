<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        {{ $t('sign_up.title') }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        <FormVal
          class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          :submit="submit_set_up"
        >
          <FormInputName
            class="sm:col-span-3"
            id="first_name"
            :label="$t('sign_up.form.first_name')"
            placeholder="Max"
            required
          />
          <FormInputName
            class="sm:col-span-3"
            id="last_name"
            :label="$t('sign_up.form.last_name')"
            placeholder="Mustermann"
            required
          />
          <FormInputEmail
            class="sm:col-span-6"
            id="email"
            :side_label="{ label: $t('common.form.optional') }"
            show_label
          />
          <div class="space-y-5 sm:col-span-6">
            <FormCheckbox
              id="public"
              :label="$t('sign_up.form.public.label')"
              :desc="$t('sign_up.form.public.desc')"
            />
            <FormCheckbox
              id="has_bed"
              :label="$t('sign_up.form.has_bed.label')"
              :desc="$t('sign_up.form.has_bed.desc')"
            />
            <FormCheckbox
              id="need_bed"
              :label="$t('sign_up.form.need_bed.label')"
              :desc="$t('sign_up.form.need_bed.desc')"
            />
            <FormCheckbox
              id="nerd"
              :label="$t('sign_up.form.nerd.label')"
              :desc="$t('sign_up.form.nerd.desc')"
            />
            <FormCheckbox
              id="vegan"
              :label="$t('sign_up.form.vegan.label')"
              :desc="$t('sign_up.form.vegan.desc')"
            />
            <FormCheckbox
              id="terms"
              :label="$t('sign_up.form.tos.label')"
              :desc="$t('sign_up.form.tos.desc')"
              required
            />
          </div>
          <FormSubmit
            class="bg-indigo-500 dark:bg-indigo-600 sm:col-span-6"
            :label="$t('sign_up.form.submit')"
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
                >{{ $t('login.oauth') }}</span
              >
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <a
              href="/sign_up/google"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#4285F4] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              target="_blank"
            >
              <IconGoogle class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">Google</span>
            </a>

            <a
              href="/sign_up/github"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
              target="_blank"
            >
              <IconGithub class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ $t('sign_up.already_signed_up.1') }}
        <NuxtLink
          to="login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >{{ $t('sign_up.already_signed_up.2') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/20/solid';
import { defineComponent } from 'vue';
import { authStore } from '@/store/auth';
import { alertStore } from '@/store/alert';
import { GraphQLError } from 'graphql/error';

export default defineComponent({
  name: 'Sign_Up',
  components: {
    EnvelopeIcon,
    KeyIcon,
  },
  setup() {
    const query_mutate_user = gql`
      mutation register($user_input_data: UserInputModel!) {
        auth_register(user_input_data: $user_input_data) {
          barrier_token
          is_admin
        }
      }
    `;
    const { mutate: mutate_user } = useMutation(query_mutate_user);

    return {
      auth: authStore(),
      alert: alertStore(),
      pw_value: ref<string>(''),
      pw_confirm_value: ref<string>(''),
      pw_confirmed: ref<boolean>(false),
      mutate_user,
    };
  },
  methods: {
    check_pw() {
      this.pw_confirmed = this.pw_value === this.pw_confirm_value;
    },
    submit_set_up(e: Event, form_data: FormData) {
      const variables = {
        user_input_data: {
          email: form_data.get('email'),
          first_name: form_data.get('first_name'),
          last_name: form_data.get('last_name'),
          public: form_data.get('public') === 'on',
          has_bed: form_data.get('has_bed') === 'on',
          need_bed: form_data.get('need_bed') === 'on',
          nerd: form_data.get('nerd') === 'on',
          vegan: form_data.get('vegan') === 'on',
        },
      };

      this.mutate_user({ ...variables })
        .then((result) => {
          if (result?.data) {
            this.alert.show('Account created', 'success');
            this.auth.login(
              result.data.auth_register.barrier_token,
              result.data.auth_register.is_admin,
            );
            this.$router.push({ name: 'profile' });
          } else {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        })
        .catch((e: GraphQLError) => {
          console.error(e);
          this.alert.show('something went wrong', 'warn');
        });
    },
  },
});
</script>
