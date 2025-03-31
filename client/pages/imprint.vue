<template>
  <div class="mx-4 my-10 flex flex-row justify-center">
    <Card
      :title="$t('imprint.title')"
      :icon="IdentificationIcon"
      class="w-full align-middle sm:w-1/2"
    >
      <p>{{ $t('imprint.declaration') }}</p>
      <p>{{ impressum.name }}</p>

      <p>
        <b>{{ $t('imprint.contact') }}:</b><br />
        {{ $t('imprint.email') }}: {{ impressum.email }}<br />
      </p>
    </Card>
  </div>
</template>

<script lang="ts">
import { IdentificationIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'privacy',
  methods: {
    IdentificationIcon,
  },
  data() {
    return {
      impressum: {
        name: 'Elias Lorenz Schaut',
        email: 'elias@schaut.dev',
      },
    };
  },
});
</script>
