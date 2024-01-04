export type Product = {
  id: number
  stock: number
  category: string
  name: string
  price: number
  sizes: string[] | string
  image: string
  description: string
  discount_percentage: number
  slug: string
  created_at: string
  updated_at: string
}

export type GetProductsParams = {
  category?: string
  search?: string
  new_release?: boolean
  on_sale?: boolean
}

export const useProduct = <T = Product>() => {
  async function get (params: GetProductsParams) {
    const res = await $larafetch<{ data: T[] }>('/api/products', {
      method: 'get',
      params
    })

    return res.data
  }

  async function show (slug: string) {
    const res = await $larafetch<{ data: T }>(`/api/products/${slug}`, {
      method: 'get'
    })

    return res.data
  }

  return {
    get,
    show
  }
}
