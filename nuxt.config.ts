// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    apiBaseUrl: 'http://localhost:8000',
    storageApiBaseUrl: 'http://localhost:8000/storage'
  },
  devtools: { enabled: true },
  // devServer: { host: '192.168.11.121' },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
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
