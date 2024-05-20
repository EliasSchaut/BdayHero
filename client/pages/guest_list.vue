<template>
  <div
    class="m-auto flex h-min w-min flex-col justify-center space-y-12 text-center align-middle font-semibold"
  >
    <span
      class="text-2xl opacity-0"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="600"
      :duration="1200"
      >Schon</span
    >
    <Countup
      class="m-auto w-min text-4xl font-bold opacity-0"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 3 }"
      :hovered="{ scale: 3.5 }"
      :delay="1000"
      :duration="3000"
      ref="count_up"
    />
    <span
      class="text-nowrap text-3xl font-semibold opacity-0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="1200"
      :duration="1200"
      >sind dabei!</span
    >
  </div>

  <HeadingItalic class="mt-10" :title="$t('pages.guest_list')" />
  <TableGuestlist class="text-md m-auto mt-2 xs:w-[20em]" />
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      users_count: ref(0),
    };
  },
  created() {
    const query_guests_count = gql`
      query {
        users_count
      }
    `;
    useAsyncQuery(query_guests_count).then((data) => {
      if (data.data && data.data.value) {
        this.$refs.count_up.start(Number(data.data.value.users_count));
      }
    });
  },
});
</script>
