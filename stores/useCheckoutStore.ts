import type { CartItemWithProduct } from './useCartStore'

interface Transaction {
  promo_code: string
  note: string
  items: CartItemWithProduct[]
}

interface CreateTransactionResponse {
  snap_token: string
  snap_url: string
}

export const useCheckoutStore = defineStore('checkout', () => {
  const config = useAppConfig()
  const auth = useAuthStore()

  async function create (transaction: Transaction) {
    const { accessToken } = await auth.getCredentials()

    const res: CreateTransactionResponse = await $fetch('/api/transactions', {
      baseURL: config.apiBaseUrl,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: transaction
    })

    return res
  }

  return {
    create
  }
})
