import { promoCodes } from '~/resources'

interface Transaction {
  user_id: number
  items: any
  checkout_details: {
    subtotal: number
    total: number
    discount: number
    promo_code: string
    note: string
  }
}

interface ApplyPromoCode {
  code: string
  subtotal: number
}

export const useCheckoutStore = defineStore('checkout', () => {
  const cart = useCartStore()
  const promoCode = ref()

  function applyPromoCode ({ code, subtotal }: ApplyPromoCode) {
    const matchedPromo = promoCodes.find(item => {
      return item.code.toLowerCase() === code.toLowerCase()
    })

    if (matchedPromo && subtotal > 0) {
      return {
        success: true,
        amount: (matchedPromo.percentage / 100) * subtotal,
        percentage: matchedPromo.percentage
      }
    }
  }

  function checkout (transaction: Transaction) {
    console.log(transaction)
  }

  async function getDiscount () {
    const subtotal = await cart.getSubtotal()
    return applyPromoCode({
      code: promoCode.value,
      subtotal: subtotal
    })
  }

  return {
    promoCode,
    applyPromoCode,
    checkout,
    getDiscount
  }
})
