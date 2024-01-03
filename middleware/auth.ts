export default defineNuxtRouteMiddleware (async () => {
  const authorized = await $larafetch('/api/authorize')
  if (!authorized) return navigateTo('/')
})
