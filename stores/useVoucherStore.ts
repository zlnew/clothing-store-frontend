export interface Voucher {
  id: number
  code: string
  name: string
  discount_percentage: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export const useVoucherStore = defineStore('voucher', () => {
  const config = useAppConfig()

  async function all() {
    const res: { data: Voucher[] } = await $fetch('/api/vouchers', {
      baseURL: config.apiBaseUrl
    })
    return res.data
  }

  async function active() {
    const res: { data: Voucher } = await $fetch('/api/vouchers', {
      baseURL: config.apiBaseUrl,
      params: { active: true }
    })
    return res.data
  }

  async function show(code: string) {
    const res: { data: Voucher } = await $fetch(`/api/vouchers/${code}`, {
      baseURL: config.apiBaseUrl
    })
    return res.data
  }

  return {
    all,
    active,
    show
  }
})