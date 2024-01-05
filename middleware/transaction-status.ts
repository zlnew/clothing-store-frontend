export default defineNuxtRouteMiddleware((to) => {
  const statuses = ['active', 'cancelled', 'finished']

  if (typeof to.params.status === 'string' && statuses.includes(to.params.status)) { return }

  return createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
})
