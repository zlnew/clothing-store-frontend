export default defineNuxtRouteMiddleware (async () => {
  const user = useUser()

  if (process.client && !user.value) {
    return window.location.href = '/'
  }
})
