import type { UseFetchOptions } from 'nuxt/app'

export function useLaraFetch<T> (
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    $fetch: $larafetch,
    onResponseError ({ response }) {
      const status = response.status

      if ([500].includes(status)) {
        console.error('[Laravel Error]', response.statusText, response._data)
      }

      if ([401, 419].includes(status)) {
        navigateTo('/')
      }

      if ([409].includes(status)) {
        navigateTo('/')
      }
    },
    ...options
  })
}
