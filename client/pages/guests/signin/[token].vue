<template>
  <div class="mt-12 flex justify-center">
    <div class="flex flex-col items-center gap-y-4">
      <Spinner class="h-12 w-12" />
      <h1 class="text-xl leading-6 font-semibold">... wait a moment</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authStore } from '~/store/auth';

const route = useRoute();
const token = route.params.token;
const auth = authStore();
auth.token;

const sign_in_query = gql`
  query {
    auth_sign_in_via_email {
      barrier_token
    }
  }
`;

const {} = useQuery(sign_in_query);
</script>
