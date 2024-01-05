// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      midtransClientKey: 'SB-Mid-client-TlYfxuK33HyfqBXk',
      backendBaseUrl: 'http://localhost:8080',
      frontendUrlBaseUrl: 'http://localhost:3000',
      storageBaseUrl: 'http://localhost:8080/storage'
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module'
  ],
  colorMode: { preference: 'light' },
  googleFonts: {
    families: {
      'Crimson Text': true
    }
  },
  ui: {
    icons: [
      'mdi'
    ]
  }
})
