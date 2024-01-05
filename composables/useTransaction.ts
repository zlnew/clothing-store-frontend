import type { Product } from './useProduct'

export type TransactionDetail = {
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

export type TransactionStatus =
  'created' |
  'pending' |
  'expired' |
  'cancelled' |
  'refunded' |
  'settlement' |
  'on_process' |
  'on_delivery' |
  'finished'

export type Transaction = {
  id: number
  order_id: number
  user_id: number
  voucher_id: number
  gross_amount: number
  note: string
  snap_token: string
  snap_url: string
  status: TransactionStatus
  details: TransactionDetail[]
  created_at: string
  updated_at: string
}

export type StoreTransaction = {
  voucher_code: string | undefined
  note: string | undefined
}

export type UpdateTransaction = {
  orderId: number
  action: 'cancel' | 'refund'
}

export type StoreTransactionResponse = {
  order_id: number
  snap_token: string
  snap_url: string
}

export const useTransaction = <T = Transaction>() => {
  async function get (status: string) {
    const res = await $larafetch<{ data: T[] }>('/api/transactions', {
      method: 'get',
      params: { status }
    })

    return res.data
  }

  async function store (body: StoreTransaction) {
    return await $larafetch<StoreTransactionResponse>('/api/transactions', {
      method: 'post',
      body: {
        voucher_code: body.voucher_code || null,
        note: body.note || null
      }
    })
  }

  async function show (orderId: number) {
    const res = await $larafetch<{ data: T }>(`/api/transactions/${orderId}`, {
      method: 'get'
    })

    return res.data
  }

  async function update ({ orderId, action }: UpdateTransaction) {
    return await $larafetch<{ message: string }>(`/api/transactions/${orderId}`, {
      method: 'patch',
      body: { action }
    })
  }

  return {
    store,
    get,
    show,
    update
  }
}
