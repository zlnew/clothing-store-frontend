<script setup lang="ts">
import SignInModal from '~/components/modals/SignInModal.vue'

useSeoMeta({
  title: 'Shopping Cart'
})

const toast = useToast()
const modal = useModalStore()
const cart = useCartStore()
const checkout = useCheckoutStore()
const { hasChanged } = storeToRefs(cart)
const { promoCode } = storeToRefs(checkout)

function openSignInModal () {
  modal.open({
    title: 'Sign In to Checkout',
    component: SignInModal,
    componentProps: {
      refUrl: window.location.href
    }
  })
}

async function onApplyPromoCode () {
  if (promoCode.value) {
    await fetchDiscount()
    const discount = await checkout.getDiscount()
    
    if (discount?.success && discount.amount > 1) {
      toast.add({
        title: `Congratulations! You get a ${discount.percentage}% discount`,
        color: 'yellow'
      })
    } else {
      toast.add({
        title: `The Promo Code you apply is invalid`,
        color: 'red'
      })
    }
  }
}

const { data: cartItems, execute: fetchCart } = await useAsyncData(
  'cart_items',
  () => cart.getItems(), {
    watch: [hasChanged]
  }
)

const { data: subtotal, execute: fetchSubtotal } = await useAsyncData(
  'subtotal',
  () => cart.getSubtotal(), {
    watch: [cartItems]
  }
)

const { data: discount, execute: fetchDiscount } = await useAsyncData(
  'discount',
  () => checkout.getDiscount(), {
    watch: [subtotal]
  }
)

const total = computed(() => {
  const subtotalValue = subtotal.value || 0
  const discountValue = discount.value?.amount || 0
  return (subtotalValue - discountValue).toFixed(2)
})

onMounted(async () => {  
  await fetchCart()
  await fetchSubtotal()
  await fetchDiscount()
})
</script>

<template>
  <div class="mt-8 md:mt-14 mb-8 space-y-14">
    <UContainer :ui="{ constrained: 'max-w-4xl' }">
      <div class="space-y-8">
        <UBreadcrumb
          divider="/"
          :links="[{
              label: 'Home',
              to: '/'
            }, {
              label: 'Shopping Cart'
            }
          ]"
          :ui="{
            active: 'text-black'
          }"
        />

        <div class="grid md:grid-cols-3 gap-14">
          <div class="md:col-span-2">
            <h2 class="mb-4 text-2xl">My Cart</h2>
            <hr class="border-black">
            <div class="mt-8 flex flex-col gap-8">
              <p v-if="cartItems && cartItems.length < 1" class="text-center">
                Cart is empty. <NuxtLink to="/shop/all" class="font-bold">Go shopping</NuxtLink>
              </p>
              <CartItem
                v-else
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
              />
              <hr class="border-black">
            </div>

            <div class="mt-8 flex flex-col gap-4">
              <div class="flex items-end gap-2">
                <UFormGroup label="Promo Code" class="w-full">
                  <UInput
                    v-model="promoCode"
                    placeholder="Enter a promo code"
                    size="xl"
                    @keyup.enter="onApplyPromoCode"
                  />
                </UFormGroup>
                <UButton
                  :label="discount ? 'Success' : 'Apply'"
                  :color="discount ? 'black' : 'yellow'"
                  size="xl"
                  @click="onApplyPromoCode"
                />
              </div>
              <UFormGroup label="Note">
                <UTextarea
                  placeholder="Add a note"
                  size="xl"
                />
              </UFormGroup>
            </div>
          </div>

          <hr class="md:hidden border-dashed border-black">

          <div>
            <h2 class="mb-4 text-2xl">Order Summary</h2>
            <hr class="border-black">
            <div class="mt-8">
              <div class="text-lg flex items-center justify-between gap-2">
                <p>Subtotal</p>
                <p>${{ (subtotal || 0).toFixed(2) }}</p>
              </div>
              <div v-if="discount?.success" class="text-lg flex items-center justify-between gap-2">
                <p>Discount</p>
                <p>-${{ discount.amount.toFixed(2) }}</p>
              </div>
              <hr class="border-black">
              <div class="mt-4 text-xl flex items-center justify-between gap-2">
                <p>Total</p>
                <strong>${{ total }}</strong>
              </div>
            </div>
            <div class="mt-8">
              <UButton
                block
                label="Checkout"
                color="black"
                size="xl"
                @click="openSignInModal"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>