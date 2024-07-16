// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  workspaceDir: '.',
  srcDir: './client',
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-particles',
    'nuxt-security',
  ],
  devServer: {
    port: Number(process.env.PORT_FRONTEND),
  },
  build: {
    transpile: ['vue-countup-v3'],
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
        httpEndpoint: `${process.env.URL_BACKEND}/graphql`,
      },
    },
  },

  content: {
    navigation: {
      fields: ['title', 'description', 'date', 'datetime', 'tag'],
    },
  },

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json',
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        isCatchallLocale: true,
        file: 'de-DE.json',
      },
    ],
    defaultLocale: 'de',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    baseUrl: process.env.URL_FRONTEND,
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

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  pinia: {
    autoImports: ['defineStore'],
  },

  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
    },
  },
});
