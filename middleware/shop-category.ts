export default defineNuxtRouteMiddleware((to) => {
  const categories = ['all', 'men', 'women']

  if (typeof to.params.category === 'string' && categories.includes(to.params.category)) { return }

  return createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
})
