export default defineNuxtPlugin(async () => {
  const { refresh } = useAuth()
  const authorized = await $larafetch('/api/authorize')

  if (!authorized) return
  await refresh()
})
