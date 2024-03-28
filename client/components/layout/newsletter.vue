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
      <input name="subscribe_r" type="hidden" value="subscribe" checked />
      <input name="FBMLNAME" type="hidden" value="bday@schaut.dev" />
      <input name="FBLANG" type="hidden" :value="$i18n.locale" />
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
    subscribe(e: Event) {
      fetch('https://ml.kundenserver.de/cgi-bin/mailinglist.cgi', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement),
        headers: {
          'Access-Control-Allow-Origin': 'no-cors',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert(
              'You have successfully subscribed to the newsletter. Please confirm by clicking the link in the email we sent you.',
            );
          } else {
            alert('An error occurred while subscribing to the newsletter.');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred while subscribing to the newsletter.');
        });
    },
  },
});
</script>

<!--<form action="https://ml.kundenserver.de/cgi-bin/mailinglist.cgi" method="POST" target="_blank">
  <input checked name="subscribe_r" type="radio" value="subscribe">
  Ja, ich möchte mich auf die Mailingliste bday@schaut.dev.
  <br />
  <input name="subscribe_r" type="radio" value="unsubscribe">
  Bitte streichen Sie mich wieder von der Mailingliste bday@schaut.dev.
  <br />
  Geben Sie Ihre E-Mail-Adresse ein:
  <br />
  <input maxlength="51" name="mailaccount_r" size="51" type="text">
  <br />
  Wiederholen Sie die eingegebene E-Mail-Adresse:
  <br />
  <input maxlength="51" name="mailaccount2_r" size="51" type="text">
  <br />
  <input type="SUBMIT" value="Absenden">
  <br />
  <input type="RESET" value="Zurücksetzen">
  <hr />
  <input name="FBMLNAME" type="hidden" value="bday@schaut.dev">
  <br />
  <input name="FBLANG" type="hidden" value="de">
  <br />
  <input name="FBURLERROR_L" type="hidden" value="https://ml.kundenserver.de/mailinglist/error.de.html">
  <br />
  <input name="FBURLSUBSCRIBE_L" type="hidden" value="https://ml.kundenserver.de/mailinglist/subscribe.de.html">
  <br />
  <input name="FBURLUNSUBSCRIBE_L" type="hidden" value="https://ml.kundenserver.de/mailinglist/unsubscribe.de.html">
  <br />
  <input name="FBURLINVALID_L" type="hidden" value="https://ml.kundenserver.de/mailinglist/invalid.de.html">
</form>
    >-->
