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
    <FormVal :submit="subscribe">
      <FormInputEmail
        id="email"
        placeholder="max@mustermann"
        class="relative z-10 w-full rounded-lg border border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-teal-500"
        required
      />
      <FormSubmit class="mt-4" label="Subscribe" />
    </FormVal>
  </div>
</template>

<script lang="ts">
import { GraphQLError } from 'graphql/error';

export default defineComponent({
  setup() {
    const query_mutate_newsletter_subscribe = gql`
      mutation newsletter_subscribe($email: String!) {
        newsletter_subscribe(newsletter_input: { email: $email })
      }
    `;
    const { mutate: mutate_newsletter_subscribe } = useMutation(
      query_mutate_newsletter_subscribe,
    );
    return {
      mutate_newsletter_subscribe,
    };
  },
  methods: {
    subscribe(e: Event, form_data: FormData) {
      this.mutate_newsletter_subscribe({
        email: form_data.get('email'),
      })
        .then((result) => {
          console.log(result);
        })
        .catch((e: GraphQLError) => {
          console.error(e);
        });
    },
  },
});
</script>
