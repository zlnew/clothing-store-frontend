export type Voucher = {
  id: number
  code: string
  name: string
  discount_percentage: number
  status: 'active' | 'inactive'
}

export const usePromo = <T = Voucher>() => {
  async function get () {
    const res: { data: T[] } = await $larafetch('/api/vouchers', {
      method: 'get'
    })
    return res.data
  }

  async function getActive() {
    const res: { data: T } = await $larafetch('/api/vouchers', {
      method: 'get',
      params: { active: true }
    })
    return res.data
  }

  async function show(code: string) {
    const res: { data: T } = await $larafetch(`/api/vouchers/${code}`, {
      method: 'get'
    })
    return res.data
  }

  return {
    get,
    getActive,
    show
  }
}
