<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        {{ $t('login.title') }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div
        class="bg-white px-6 py-12 text-center leading-6 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        {{ $t('login.desc') }}
      </div>
      <div
        class="hidden bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        <FormVal class="space-y-6" :submit="submit_login">
          <FormInputEmail id="email" required />
          <FormSubmit
            class="bg-indigo-500 dark:bg-indigo-600"
            :label="$t('login.submit')"
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

          <div class="mt-6 grid hidden grid-cols-2 gap-4">
            <a
              href="/sign_up/google"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#4285F4] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
            >
              <IconGoogle class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">Google</span>
            </a>

            <a
              href="/sign_up/github"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
            >
              <IconGithub class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ $t('login.no_account') }}
        <NuxtLink
          to="sign_up"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >{{ $t('login.sign_up') }}</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/20/solid';
import { defineComponent } from 'vue';
import { authStore } from '@/store/auth';
import { alertStore } from '@/store/alert';

export default defineComponent({
  name: 'Login',
  components: {
    EnvelopeIcon,
    KeyIcon,
  },
  setup() {
    return {
      auth: authStore(),
      alert: alertStore(),
    };
  },
  created() {
    if (!this.$route.params.login_challenge) return;
    const query_login = gql`
      query auth_sign_in($login_challenge: String!) {
        auth_sign_in(challenge: $login_challenge) {
          barrier_token
          is_admin
        }
      }
    `;
    useAsyncQuery(query_login, {
      login_challenge: this.$route.params.login_challenge,
    }).then((data) => {
      console.log(data);
      if (data?.data && data?.data?.value?.auth_sign_in) {
        this.alert.show('Successfully logged in', 'success');
        this.auth.login(
          data.data.value.auth_sign_in.barrier_token,
          data.data.value.auth_sign_in.is_admin,
        );
        this.$router.push({ name: 'profile' });
      } else {
        this.alert.show('Login unsuccessful', 'warn');
      }
    });
  },
  methods: {
    async submit_login(e: Event) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const query = gql`
        query login($email: String!) {
          auth_sign_in(email: $email) {
            barrier_token
            is_admin
          }
        }
      `;

      const { data } = await useAsyncQuery(query, {
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (data.value) {
        this.auth.login(
          data.value.auth_sign_in.barrier_token,
          data.value.auth_sign_in.is_admin,
        );
        this.$router.push('/');
      } else {
        this.alert.show('Invalid credentials', 'warn');
      }
    },
  },
});
</script>
