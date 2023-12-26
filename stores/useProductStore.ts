export interface Product {
  id: number
  category: string
  name: string
  price: number
  sizes: string[]
  image: string
  description: string
  slug: string
  discount: number | null
  created_at: string
  updated_at: string
}

interface GetProductsParams {
  category?: string
  search?: string
}

export const useProductStore = defineStore('product', () => {
  const config = useAppConfig()

  async function all(params: GetProductsParams) {
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
