export interface Product {
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

interface GetProductsParams {
  category?: string
  search?: string
  new_release?: boolean
  on_sale?: boolean
}

export const useProductStore = defineStore('product', () => {
  const config = useAppConfig()

  async function all(params?: GetProductsParams) {
    const res: { data: Product[] } = await $fetch('/api/products', {
      baseURL: config.apiBaseUrl,
      params
    })
    return res.data
  }

  async function show(slug: string) {
    const res: { data: Product } = await $fetch(`/api/products/${slug}`, {
      baseURL: config.apiBaseUrl
    })
    return res.data
  }

  return {
    all,
    show
  }
})
