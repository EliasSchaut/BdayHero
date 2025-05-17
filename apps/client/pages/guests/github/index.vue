<template>
  <div class="mt-12 flex justify-center">
    <div class="flex flex-col items-center gap-y-4">
      <Spinner class="h-12 w-12" />
      <h1 class="text-xl leading-6 font-semibold">... wait a moment</h1>
    </div>
  </div>
</template>

<script lang="ts">
import type { SignedInModel } from "@bdayhero/shared";
import { authStore } from "~/store/auth";
import { alertStore } from "~/store/alert";

type SignInResult = { auth_sign_in_via_email: SignedInModel };

const sign_in_query = gql`
  query sign_in_query($token: String!) {
    auth_sign_in_via_email(token_input: { token: $token }) {
      barrier_token
    }
  }
`;

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const code = route.query.code;
    const auth = authStore();
    const alert = alertStore();

    if (code) {
      fetch(`/api/auth/github?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ jwt_token, github }) => {
          router.push(`/guests/local/${jwt_token}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // useAsyncQuery<SignInResult>(sign_in_query, { token }).then(({ data }) => {
    //   if (data.value?.auth_sign_in_via_email?.barrier_token) {
    //     auth.login(data.value.auth_sign_in_via_email.barrier_token);
    //     alert.show("You have successfully signed in.", "success");
    //     useRouter().push("/guests");
    //   }
    // });
  },
});
</script>
