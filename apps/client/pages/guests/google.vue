<template>
  <Loading />
</template>

<script setup lang="ts">
import { call_oauth_endpoint } from "~/utils/oauth";

const router = useRouter();
const route = useRoute();
const code = route.query.code;

if (code) {
  call_oauth_endpoint("google", code as string).then(({ jwt_token, user }) => {
    router.push(`/guests/local/${jwt_token}`);
  });
}
</script>
