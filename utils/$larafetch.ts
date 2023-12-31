import { $fetch } from 'ofetch'
import { parseCookies } from 'h3'

const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

export const $larafetch = $fetch.create({
  credentials: 'include',
  async onRequest ({ options }) {
    const { backendBaseUrl, frontendUrlBaseUrl } = useRuntimeConfig().public
    const event = typeof useEvent === 'function' ? useEvent() : null
    let token = event
      ? parseCookies(event)[CSRF_COOKIE]
      : useCookie(CSRF_COOKIE).value

    if (
      process.client &&
      ['post', 'delete', 'put', 'patch'].includes(
        options?.method?.toLowerCase() ?? ''
      )
    ) {
      token = await initCsrf()
    }

    let headers: any = {
      accept: 'application/json',
      ...options?.headers,
      ...(token && { [CSRF_HEADER]: token })
    }

    if (process.server) {
      const cookieString = event
        ? event.headers.get('cookie')
        : useRequestHeaders(['cookie']).cookie

      headers = {
        ...headers,
        ...(cookieString && { cookie: cookieString }),
        referer: frontendUrlBaseUrl
      }
    }

    options.headers = headers
    options.baseURL = backendBaseUrl
  },
  onResponseError ({ response }) {
    const status = response.status
    if ([500].includes(status)) {
      console.error('[Laravel Error]', response.statusText, response._data)
    }
  }
})

async function initCsrf () {
  const { backendBaseUrl } = useRuntimeConfig().public
  const existingToken = useCookie(CSRF_COOKIE).value

  if (existingToken) { return existingToken }

  await $fetch('/sanctum/csrf-cookie', {
    baseURL: backendBaseUrl,
    credentials: 'include'
  })

  return useCookie(CSRF_COOKIE).value
}
