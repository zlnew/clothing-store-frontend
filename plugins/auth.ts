export default defineNuxtPlugin(async () => {
  const user = useUser()
  const { refresh } = useAuth()

  if (!!user.value) return
  await refresh()
})
