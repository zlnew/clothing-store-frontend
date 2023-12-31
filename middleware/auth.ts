export default defineNuxtRouteMiddleware(async () => {
  const { credentials } = useAuthStore()

  if (!credentials.accessToken && !credentials.user) {
    abortNavigation({
      message: 'Not Found',
      statusCode: 404
    })
  }
})
