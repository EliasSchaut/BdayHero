import * as dotenv from 'dotenv';
import * as path from 'node:path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env'), quiet: true });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-04-15',
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  // Defaults bleiben leer – die Werte kommen zur Laufzeit aus den NUXT_*-Env-Vars.
  // Die Keys sind in der .env bereits NUXT_-praefixiert, Nuxt mappt sie automatisch:
  //   public.frontend_url <- NUXT_PUBLIC_FRONTEND_URL, jwt_secret <- NUXT_JWT_SECRET, ...
  runtimeConfig: {
    public: {
      frontend_url: '',
      max_companions_per_guest: '',
      github_client_id: '',
      google_client_id: '',
      discord_client_id: '',
      jwt_expiration: '',
    },
    jwt_secret: '',
    github_client_secret: '',
    google_client_secret: '',
    discord_client_secret: '',
  },

  site: {
    url: 'https://bday.schaut.dev',
    name: "Kid's Bday",
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  apollo: {
    autoImports: true,
    proxyCookies: true,
    clients: {
      default: {
        tokenName: 'token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization',
        httpEndpoint: `${process.env.BACKEND_URL}`,
      },
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    families: [
      {
        name: 'Nunito',
        provider: 'local',
      },
    ],
  },

  i18n: {
    langDir: 'locales',
    restructureDir: 'app',
    locales: [
      {
        code: 'en_US',
        iso: 'en-US',
        name: 'English',
        isCatchallLocale: true,
        file: 'en_US.json',
      },
      {
        code: 'de_DE',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de_DE.json',
      },
    ],
    defaultLocale: 'en_US',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en_US',
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 365 * 60 * 24 * 30,
    },
  },

  tailwindcss: {
    cssPath: [`~/assets/css/tailwind.css`],
    config: {},
    viewer: true,
    exposeConfig: false,
  },
});
