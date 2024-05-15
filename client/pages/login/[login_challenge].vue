<template></template>

<script lang="ts">
import { GraphQLError } from 'graphql/error';
import { alertStore } from '~/store/alert';
import { authStore } from '~/store/auth';

export default defineComponent({
  setup() {
    const query_login = gql`
      mutation sign_in($login_challenge: String!) {
        sign_in(challenge: $login_challenge) {
          barrier_token
          is_admin
        }
      }
    `;
    const { mutate: mutate_sign_in } = useMutation(query_login);
    return {
      auth: authStore(),
      alert: alertStore(),
      mutate_sign_in,
    };
  },
  mounted() {
    this.mutate_sign_in(this.$route.params.login_challenge)
      .then((result) => {
        if (result?.data) {
          this.alert.show('Successfully logged in', 'success');
          this.auth.login(
            result.data.auth_register.barrier_token,
            result.data.auth_register.is_admin,
          );
          this.$router.push({ name: 'profile' });
        } else {
          this.alert.show('Login unsuccessful', 'warn');
          this.$router.push({ name: 'login' });
        }
      })
      .catch((e: GraphQLError) => {
        console.error(e);
        this.alert.show('Something went wrong', 'danger');
      });
  },
});
</script>
