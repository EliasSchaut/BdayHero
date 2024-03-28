<template>
  <div class="mx-auto max-w-2xl p-4">
    <LayoutHeading class="relative text-center text-2xl md:text-7xl">
      Get notified
    </LayoutHeading>
    <p
      class="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500"
    >
      Get notified when the next Bday24 Infos are coming up.
    </p>
    <Form
      action="https://ml.kundenserver.de/cgi-bin/mailinglist.cgi"
      method="POST"
      :submit="subscribe"
    >
      <FormInputEmail
        id="mailaccount_r"
        placeholder="max@mustermann"
        class="relative z-10 w-full rounded-lg border border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-teal-500"
        required
      />
      <FormSubmit
        class="mt-4 rounded-md bg-neutral-600 hover:bg-neutral-500"
        label="Subscribe"
      />
    </Form>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  methods: {
    subscribe(e: Event, form_data: FormData) {},
  },
});
</script>
