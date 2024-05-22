<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        {{ $t('profile.title') }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="bg-white px-6 py-12 shadow dark:bg-gray-800 sm:rounded-lg sm:px-12"
      >
        <FormVal
          class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          :submit="submit_user_update"
        >
          <FormInputName
            class="sm:col-span-3"
            id="first_name"
            :label="$t('sign_up.form.first_name')"
            placeholder="Max"
            :value="user?.first_name"
            required
          />
          <FormInputName
            class="sm:col-span-3"
            id="last_name"
            :label="$t('sign_up.form.last_name')"
            placeholder="Mustermann"
            :value="user?.last_name"
            required
          />
          <FormInputEmail
            class="hidden sm:col-span-6"
            id="email"
            :side_label="{ label: $t('common.form.optional') }"
            :value="user?.email"
            show_label
          />
          <div class="space-y-5 sm:col-span-6">
            <FormCheckbox
              id="public"
              :label="$t('sign_up.form.public.label')"
              :desc="$t('sign_up.form.public.desc')"
              :checked="user?.public"
            />
            <FormCheckbox
              id="has_bed"
              :label="$t('sign_up.form.has_bed.label')"
              :desc="$t('sign_up.form.has_bed.desc')"
              :checked="user?.has_bed"
            />
            <FormCheckbox
              id="need_bed"
              :label="$t('sign_up.form.need_bed.label')"
              :desc="$t('sign_up.form.need_bed.desc')"
              :checked="user?.need_bed"
            />
            <FormCheckbox
              id="nerd"
              :label="$t('sign_up.form.nerd.label')"
              :desc="$t('sign_up.form.nerd.desc')"
              :checked="user?.nerd"
            />
            <FormCheckbox
              id="vegan"
              :label="$t('sign_up.form.vegan.label')"
              :desc="$t('sign_up.form.vegan.desc')"
              :checked="user?.vegan"
            />
          </div>
          <FormSubmit
            ref="user_update_button"
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
                >{{ $t('profile.actions.title') }}</span
              >
            </div>
          </div>
          <div class="mt-6 flex justify-center space-x-6 text-center">
            <Button
              class="dark:hover:gb-gray-700 bg-gray-400 text-white hover:bg-gray-300 dark:bg-gray-600"
              ref="btn_copy_login"
              @click="copy_login_to_clipboard"
              >{{ $t('profile.actions.login_link') }}
            </Button>
            <Button
              class="dark:hover:gb-gray-700 bg-gray-400 text-white hover:bg-gray-300 dark:bg-gray-600"
              ref="btn_get_user_data"
              @click="get_user_data"
              >{{ $t('profile.actions.user_data') }}
            </Button>
            <Button
              class="bg-gray-400 text-white hover:bg-red-400 dark:bg-gray-600 dark:hover:bg-red-600"
              @click="$refs.modal_delete_account.show()"
              >{{ $t('profile.actions.delete') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal ref="modal_delete_account">
    <p class="mb-6 text-center text-red-400">
      {{ $t('profile.actions.delete_sure') }}
    </p>
    <FormVal
      class="flex-column mb--2 flex justify-center"
      :submit="submit_delete_user"
    >
      <FormSubmit
        label="Delete"
        ref="btn_delete_account"
        class="bg-red-600 hover:bg-red-700 focus-visible:outline-red-500"
      />
    </FormVal>
  </Modal>
</template>

<script lang="ts">
import { alertStore } from '~/store/alert';
import { authStore } from '~/store/auth';

export default defineComponent({
  setup() {
    const user_update_query = gql`
      mutation user_update($user_update_input_data: UserUpdateInputModel!) {
        user_update(user_update_input_data: $user_update_input_data) {
          id
        }
      }
    `;
    const user_delete_query = gql`
      mutation user_delete {
        user_delete {
          id
        }
      }
    `;

    const { mutate: user_update } = useMutation(user_update_query);
    const { mutate: user_delete } = useMutation(user_delete_query);
    return {
      user_update,
      user_delete,
      user: ref({}),
      alert: alertStore(),
      auth: authStore(),
    };
  },
  created() {
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
    useAsyncQuery(user_query).then((data) => {
      if (data.data && data.data.value) {
        this.user = data.data.value.user;
      } else {
        this.auth.logout();
        this.alert.show('You have been logged out', 'warn');
        this.$router.push('/login');
      }
    });
  },
  methods: {
    submit_user_update(e: Event, form_data: FormData) {
      const btn = this.$refs.user_update_button;
      btn.set_loading();
      const variables = {
        user_update_input_data: {
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
      this.user_update({ ...variables }).then((data) => {
        if (data?.data && data?.data?.value) {
          this.alert.show('User updated successfully', 'success');
        } else {
          this.alert.show('Something went wrong', 'warn');
        }
        btn.set_success_then_default();
      });
    },
    get_user_data() {
      const json = JSON.stringify(this.user);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'user_data.json';
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
      this.$refs.btn_get_user_data.set_success_then_default();
    },
    copy_login_to_clipboard() {
      navigator.clipboard.writeText(
        `${window.location.origin}/login/${this.user.login_challenge}`,
      );
      this.$refs.btn_copy_login!.set_success_then_default();
    },
    submit_delete_user(e: Event, form_data: FormData) {
      this.$refs.btn_delete_account.set_loading();
      this.user_delete({}).then((data) => {
        this.$refs.btn_delete_account.set_success_then_default();
        this.auth.logout();
        this.$router.push('/');
      });
    },
  },
});
</script>
