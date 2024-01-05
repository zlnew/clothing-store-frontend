import type { Product } from './useProduct'
import type { StoreTransaction } from './useTransaction'

export type ShoppingCartItem = {
  id: number
  user_id: number
  product_id: number
  quantity: number
  size: string
  product: Product
}

export type ShoppingCart = {
  items: ShoppingCartItem[]
  subtotal: number
}

export type StoreItemBody = {
  product_id: number
  quantity: number
  size: string
}

export type UpdateItemBody = {
  id: number
  product_id: number
  quantity: number
}

export type RemoveItemParams = {
  product_id: number
  size: string
}

export type Discount = {
  percentage: number
  message: string | null
}

export type Checkout = StoreTransaction

export const useCartItems = <T = ShoppingCartItem>() => {
  return useState<T[] | undefined | null>('cartItems', () => undefined)
}

export const useCartSubtotal = () => {
  return useState<number>('cartSubtotal', () => 0)
}

export const useCartSlideover = () => {
  return useState<boolean>('cartSlideover', () => false)
}

export const useCartDiscount = () => {
  return useState<Discount>('cartDiscount', () => ({
    percentage: 0,
    message: null
  }))
}

export const useCartCheckoutData = () => {
  return useState<StoreTransaction>('cartCheckout', () => ({
    voucher_code: undefined,
    note: undefined
  }))
}

export const useShoppingCart = <T = ShoppingCartItem>() => {
  const items = useCartItems<ShoppingCartItem>()
  const subtotal = useCartSubtotal()
  const slideover = useCartSlideover()
  const discount = useCartDiscount()
  const checkoutData = useCartCheckoutData()
  const promo = usePromo()

  async function refresh () {
    try {
      const data = await fetchCartItems()
      items.value = data
      subtotal.value = calculateSubtotal(data)
    } catch {
      items.value = null
      subtotal.value = 0
    }
  }

  async function getDiscount (code: string) {
    try {
      const data = await promo.show(code)

      if (data.status === 'inactive') {
        discount.value.message = 'Expired promo code'
        checkoutData.value.voucher_code = undefined
      }

      discount.value = {
        message: `Congratulations. You get a ${data.discount_percentage} off your checkout`,
        percentage: data.discount_percentage
      }
    } catch {
      discount.value.message = 'Invalid Promo Code'
      checkoutData.value.voucher_code = undefined
    }
  }

  async function store (body: StoreItemBody) {
    await $larafetch<{ data: T[] }>('/api/cart-items', {
      method: 'post',
      body
    })
    await refresh()
    slideover.value = true
  }

  async function update ({ id, product_id, quantity }: UpdateItemBody) {
    await $larafetch<{ data: T }>(`/api/cart-items/${id}`, {
      method: 'patch',
      body: { product_id, quantity }
    })
    await refresh()
  }

  async function destroy (id: number) {
    await $larafetch(`/api/cart-items/${id}`, {
      method: 'delete'
    })
    await refresh()
  }

  return {
    items,
    subtotal,
    slideover,
    discount,
    checkoutData,
    store,
    update,
    destroy,
    getDiscount,
    refresh
  }
}

export const fetchCartItems = async <T = ShoppingCartItem>() => {
  const res = await $larafetch<{ data: T[] }>('/api/cart-items', {
    method: 'get'
  })

  return res.data
}

function calculateSubtotal (items: ShoppingCartItem[]) {
  return items.reduce((prev, curr) => {
    const discount_percentage = curr.product.discount_percentage
    const price = curr.product.price
    const discountedAmount = (discount_percentage / 100) * price
    const finalPrice = price - discountedAmount

    return prev + finalPrice * curr.quantity
  }, 0)
}
