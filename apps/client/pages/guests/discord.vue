<template>
  <Loading />
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const code = route.query.code;

if (code) {
  fetch(`/api/auth/discord?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ jwt_token, discord }) => {
      router.push(`/guests/local/${jwt_token}`);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>
