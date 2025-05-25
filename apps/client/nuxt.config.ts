import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  workspaceDir: '../../',
  srcDir: '.',
  compatibilityDate: '2025-05-05',
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    'nuxt-particles',
    'pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
  ],

  runtimeConfig: {
    public: {
      frontend_url: process.env.FRONTEND_URL,
      max_companions_per_guest: process.env.MAX_COMPANIONS_PER_GUEST,
      github_client_id: process.env.GITHUB_CLIENT_ID,
      google_client_id: process.env.GOOGLE_CLIENT_ID,
      discord_client_id: process.env.DISCORD_CLIENT_ID,
      jwt_expiration: process.env.JWT_EXPIRATION,
    },
    jwt_secret: process.env.JWT_SECRET,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    discord_client_secret: process.env.DISCORD_CLIENT_SECRET,
  },

  vite: {
    plugins: [tailwindcss()],
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
    restructureDir: false,
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
    lazy: true,
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

  dayjs: {
    plugins: ['timezone'],
    locales: ['de'],
    defaultLocale: 'de',
    defaultTimezone: 'Europe/Berlin',
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 365 * 60 * 24 * 30,
    },
  },

  particles: {
    mode: 'slim',
    lazy: true,
  },
});
