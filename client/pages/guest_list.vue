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
      >{{ $t('guestlist.countup.head') }}</span
    >
    <CountUp
      class="m-auto w-min text-4xl font-bold opacity-0"
      v-motion
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{ opacity: 1, scale: 3 }"
      :hovered="{ scale: 3.5 }"
      :startVal="0"
      :endVal="0"
      :delay="1"
      :duration="3"
      @init="onInit"
    />
    <span
      class="text-nowrap text-3xl font-semibold opacity-0"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="1200"
      :duration="1200"
      >{{ $t('guestlist.countup.tail') }}!</span
    >
  </div>

  <HeadingItalic class="mt-10" :title="$t('pages.guest_list')" />
  <TableGuestlist class="text-md m-auto mt-2 xs:w-[20em]" />
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3';
import type { ICountUp } from 'vue-countup-v3';

const query_guests_count = gql`
  query {
    users_count
  }
`;
const { result: result_guest_count } = useQuery(query_guests_count, null, {
  prefetch: true,
});

const onInit = (countUp: ICountUp) => {
  countUp.update(result_guest_count?.value?.users_count);
};
</script>
