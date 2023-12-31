import type { Product } from "./useProductStore"

export interface CartItem {
  id: number
  name: string
  quantity: number
  price: number
  size: string
}

export interface CartItemWithProduct {
  id: number
  name: string
  quantity: number
  price: number
  size: string
  product: Product
}

interface RemoveItemParams {
  id: number
  size: string
}

interface ApplyPromoCode {
  code: string
  subtotal: number
}

export const useCartStore = defineStore('cart', () => {
  const voucher = useVoucherStore()
  const product = useProductStore()
  const products = ref<Product[]>()
  const slideover = ref(false)
  const hasChanged = ref(false)
  const promoCode = ref('')
  const note = ref('')
  const subtotal = ref(0)

  function get () {
    const cartJSON = localStorage.getItem('cart')
    return cartJSON ? JSON.parse(cartJSON) as CartItem[] : []
  }

  function add (newItem: CartItem) {
    const cart = get()
  
    const existingItemIndex = cart.findIndex(item => {
      const matchedId = item.id === newItem.id
      const matchedSize = item.size === newItem.size
      return matchedId && matchedSize
    })
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += newItem.quantity
    } else {
      cart.push(newItem)
    }
  
    localStorage.setItem('cart', JSON.stringify(cart))
    hasChanged.value = true
  }

  function update (newItem: CartItem) {
    const cart = get()
  
    const existingItemIndex = cart.findIndex(item => {
      const matchedId = item.id === newItem.id
      const matchedSize = item.size === newItem.size
      return matchedId && matchedSize
    })
  
    if (existingItemIndex !== -1) {
      if (newItem.quantity > 0) {
        cart[existingItemIndex].quantity = newItem.quantity
      }
    } else {
      cart.push(newItem)
    }
  
    localStorage.setItem('cart', JSON.stringify(cart))
    hasChanged.value = true
  }

  function remove ({ id, size }: RemoveItemParams) {
    const cart = get()
    
    const newCart = cart.filter(item => {
      const matchedId = item.id !== id
      const matchedSize = item.size !== size
      return matchedId || matchedSize
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    hasChanged.value = true
  }

  function empty () {
    localStorage.setItem('cart', JSON.stringify([]))
    hasChanged.value = true
  }

  async function getItems () {
    hasChanged.value = false

    const cart = get()

    if (!products.value) {
      products.value = await product.all()
    }

    return cart.map((item) => {
      const matchedItem = products.value?.find(product => product.id === item.id)

      return matchedItem && {
        ...item,
        product: matchedItem,
      }
    }).filter(item => item !== undefined) as CartItemWithProduct[]
  }

  async function getSubtotal () {
    const items = await getItems()

    const itemsSubtotal = items.reduce((sum, item) => {
      if (item) {
        const discountPercentage = item.product.discount_percentage
        const price = item.product.price
        const discountedAmount = (discountPercentage / 100) * price
        const finaPrice = (discountPercentage > 0) ? price - discountedAmount : price
        return sum + (finaPrice * item.quantity)
      } else {
        return sum
      }
    }, 0)

    subtotal.value = itemsSubtotal

    return itemsSubtotal
  }

  async function getPromo () {
    return applyPromoCode({
      code: promoCode.value,
      subtotal: subtotal.value
    })
  }

  async function applyPromoCode ({ code, subtotal }: ApplyPromoCode) {
    try {
      const promo = await voucher.show(code)
      
      return {
        success: promo.status === 'active',
        discount_amount: (promo.discount_percentage / 100) * subtotal,
        discount_percentage: promo.discount_percentage
      }
    } catch {
      return {
        success: false
      }
    }
  }

  return {
    slideover,
    hasChanged,
    promoCode,
    note,
    get,
    add,
    update,
    remove,
    empty,
    getItems,
    getSubtotal,
    getPromo,
    applyPromoCode
  }
})
