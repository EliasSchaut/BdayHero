import { provideApolloClient } from '@vue/apollo-composable';
import type { ApolloClient } from '@apollo/client/core';
import { ApolloLink, from } from '@apollo/client/core';
import { alertStore, AlertType } from '@/store/alert';
import { authStore } from '~/store/auth';

let locale = 'en_US';

export default defineNuxtPlugin(({ hook }) => {
  const { clients } = useApollo();
  const default_client: ApolloClient<any> = (clients as any).default;

  const alert = alertStore();
  const auth = authStore();

  const alert_link = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
      if (data.errors && data.errors.length) {
        const error_code = data.errors[0]?.extensions?.code ?? 'danger';
        const error_msg = data.errors[0].message;
        alert.show(error_msg, error_code as AlertType['type']);
        if (error_code === 'FORBIDDEN') {
          auth.logout();
        }
      }
      return data;
    });
  });

  const auth_link = new ApolloLink((operation, forward) => {
    const auth = authStore();
    if (auth.logged_in) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.token}`,
          'accept-language': locale,
        },
      });
    } else {
      operation.setContext({
        headers: {
          'accept-language': locale,
        },
      });
    }

    return forward(operation);
  });

  default_client.setLink(from([auth_link, alert_link, default_client.link]));
  provideApolloClient(default_client);

  hook('apollo:error', (error) => {
    console.error('error: ', error);
  });

  hook('i18n:beforeLocaleSwitch', ({ newLocale }) => {
    locale = newLocale;
  });
});
