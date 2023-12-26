import { products, type Product } from '~/resources'

export interface CartItem {
  id: number
  quantity: number
  size: string
}

export interface CartItemWithProduct {
  id: number
  quantity: number
  size: string
  product: Product
}

interface RemoveItemParams {
  id: number
  size: string
}

export const useCartStore = defineStore('cart', () => {
  const slideover = ref(false)
  const hasChanged = ref(false)

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
    return get().map(item => {
      const matchedItem = products.find(product => product.id === item.id)
      return {
        ...item,
        product: matchedItem
      }
    }) as CartItemWithProduct[]
  }

  async function getSubtotal (): Promise<number> {
    return getItems().then((data) => {
      return data.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity)
      }, 0)
    })
  }

  return {
    slideover,
    hasChanged,
    get,
    add,
    update,
    remove,
    empty,
    getItems,
    getSubtotal
  }
})
