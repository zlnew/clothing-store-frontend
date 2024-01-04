import { FetchError } from 'ofetch'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    if (!(error instanceof FetchError)) throw error

    const status = error.response?.status ?? -1

    if ([401, 419].includes(status)) {
      nuxtApp.runWithContext(() => navigateTo('/', {
        replace: true
      }))
    }

    if ([409].includes(status)) {
      nuxtApp.runWithContext(() => navigateTo('/', {
        replace: true
      }))
    }
  })
})
