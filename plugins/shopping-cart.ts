export default defineNuxtPlugin(async () => {
  const user = useUser()
  const items = useCartItems()
  const { refresh } = useShoppingCart()

  if (!user.value) { return }
  if (items.value) { return }
  await refresh()
})
