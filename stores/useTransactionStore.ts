import type { Product } from "./useProductStore"

export interface Transaction {
  id: number
  order_id: string
  user_id: number
  voucher_id: number | null
  gross_amount: number
  note: string | null
  snap_token: string
  snap_url: string
  status: 'pending' | 'cancelled' | 'expired' | 'refunded' | 'settlement' | 'finished' | 'on_delivery' | 'on_process'
  details: TransactionDetails[]
  created_at: string
  updated_at: string
}

export interface TransactionDetails {
  id: number
  transaction_id: number
  name: string
  quantity: number
  price: number
  size: string
  product: Product
  created_at: string
  updated_at: string
}

export const useTransactionStore = defineStore('transaction', () => {
  const config = useAppConfig()
  const auth = useAuthStore()
  const midtransApiBaseUrl = 'https://api.sandbox.midtrans.com'
  
  function pay (redirectUrl: string) {
    window.open(redirectUrl)
  }

  async function cancel (orderId: string) {
    return $fetch(`/v2/${orderId}/cancel`, {
      method: 'POST',
      baseURL: midtransApiBaseUrl
    })
  }

  async function refund (orderId: string) {
    return $fetch(`/v2/${orderId}/refund`, {
      method: 'POST',
      baseURL: midtransApiBaseUrl
    })
  }

  async function all (status?: string) {
    const { accessToken } = await auth.getCredentials()

    const res: { data: Transaction[] } = await $fetch('/api/transactions', {
      baseURL: config.apiBaseUrl,
      params: { status },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return res.data
  }

  async function show (orderId: string) {
    const { accessToken } = await auth.getCredentials()

    const res: { data: Transaction } = await $fetch(`/api/transactions/${orderId}`, {
      baseURL: config.apiBaseUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return res.data
  }

  return {
    pay,
    cancel,
    refund,
    all,
    show
  }
})
