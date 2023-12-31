export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  password: string
  created_at: string
  updated_at: string
  customer_details: CustomerDetails
}

export interface CustomerDetails {
  id: number
  user_id: number
  phone_number: string
  address: string
  postal_code: string
  created_at: string
  updated_at: string
}


interface Credentials {
  accessToken: string | undefined
  user: User | undefined
}

interface CredentialsPayload {
  accessToken: string
  user: User
}

interface signInPayload {
  email: string
  password: string
}

interface signUpPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface SignInResponse {
  user: User
  access_token: string
}

interface SignUpResponse {
  user: User
  access_token: string
}

export interface ValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export const useAuthStore = defineStore('auth', () => {
  const config = useAppConfig()

  const credentials = useCookie<Credentials>(
    'credentials', {
      default: () => ({ accessToken: undefined, user: undefined }),
      httpOnly: process.env.NODE_ENV === 'production',
      watch: true
    }
  )

  async function getCredentials () {
    const { accessToken, user } = credentials.value
    return {
      accessToken,
      user
    }
  }

  async function setCredentials (payload: CredentialsPayload) {
    credentials.value = {
      accessToken: payload.accessToken,
      user: payload.user
    }
  }

  async function removeCredentials () {
    credentials.value = {
      accessToken: undefined,
      user: undefined
    }
  }

  async function authorize () {
    const { accessToken } = await getCredentials()

    const status: boolean = await $fetch('/api/authorize', {
      baseURL: config.apiBaseUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return status
  }

  async function signIn (body: signInPayload) {
    const res: SignInResponse = await $fetch('/api/auth/login', {
      method: 'POST',
      baseURL: config.apiBaseUrl,
      body
    })

    return res
  }

  async function signUp (body: signUpPayload) {
    const res: SignUpResponse = await $fetch('/api/auth/register', {
      method: 'POST',
      baseURL: config.apiBaseUrl,
      body
    })

    return res
  }

  async function signOut () {
    const { accessToken } = await getCredentials()

    await $fetch('/api/auth/logout', {
      method: 'POST',
      baseURL: config.apiBaseUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    removeCredentials().then(() => {
      window.location.href = '/'
    })
  }

  return {
    credentials,
    setCredentials,
    getCredentials,
    authorize,
    signIn,
    signUp,
    signOut
  }
})