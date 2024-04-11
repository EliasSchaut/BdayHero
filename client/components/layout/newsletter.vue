<template>
  <div class="mx-auto max-w-2xl p-4">
    <LayoutHeading class="relative text-center text-2xl md:text-7xl">
      {{ $t('home.newsletter.title') }}
    </LayoutHeading>
    <p
      class="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500"
    >
      {{ $t('home.newsletter.subtitle') }}
    </p>
    <FormVal class="flex flex-col justify-center" :submit="submit">
      <FormInputEmail
        id="email"
        placeholder="max@mustermann"
        class="relative z-10 w-full rounded-lg border border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-700 focus:ring-2 focus:ring-teal-500"
        required
      />
      <FormSubmit
        @click="action = 'subscribe'"
        :class="[
          feedback_done
            ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600'
            : '',
          'mt-4 transform ease-in-out',
        ]"
        :label="
          feedback_done
            ? $t('home.newsletter.done')
            : $t('home.newsletter.subscribe')
        "
      />
      <button
        @click="action = 'unsubscribe'"
        type="submit"
        class="mt-4 font-bold text-zinc-600 underline hover:text-zinc-500"
      >
        {{ $t('home.newsletter.unsubscribe') }}
      </button>
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
    const query_mutate_newsletter_unsubscribe = gql`
      mutation newsletter_unsubscribe($email: String!) {
        newsletter_unsubscribe(newsletter_input: { email: $email })
      }
    `;
    const { mutate: mutate_newsletter_subscribe } = useMutation(
      query_mutate_newsletter_subscribe,
    );
    const { mutate: mutate_newsletter_unsubscribe } = useMutation(
      query_mutate_newsletter_unsubscribe,
    );
    return {
      mutate_newsletter_subscribe,
      mutate_newsletter_unsubscribe,
      feedback_done: ref(false),
      action: ref('subscribe') as Ref<'subscribe' | 'unsubscribe'>,
    };
  },
  methods: {
    async submit(e: Event, form_data: FormData) {
      if (this.action === 'subscribe') {
        this.subscribe(e, form_data);
      } else {
        this.unsubscribe(e, form_data);
      }
    },
    async subscribe(e: Event, form_data: FormData) {
      this.mutate_newsletter_subscribe({
        email: form_data.get('email'),
      })
        .then((result) => {
          if (result?.data?.newsletter_subscribe) {
            this.feedback_done = true;
          }
        })
        .catch((e: GraphQLError) => {
          console.error(e);
        });
    },
    async unsubscribe(e: Event, form_data: FormData) {
      this.mutate_newsletter_unsubscribe({
        email: form_data.get('email'),
      })
        .then((result) => {
          if (result?.data?.newsletter_unsubscribe) {
            this.feedback_done = true;
          }
        })
        .catch((e: GraphQLError) => {
          console.error(e);
        });
    },
  },
});
</script>
