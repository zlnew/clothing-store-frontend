export default defineNuxtRouteMiddleware (async () => {
  const nuxtApp = useNuxtApp()
  const user = useUser()

  if (!user.value) {
    return nuxtApp.runWithContext(() => navigateTo('/', {
      replace: true
    }))
  }
})
