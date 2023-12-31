<script setup lang="ts">
import SignInModal from '~/components/modals/SignInModal.vue'

useSeoMeta({
  title: 'Shopping Cart'
})

const toast = useToast()
const modal = useModalStore()
const auth = useAuthStore()
const cart = useCartStore()
const checkout = useCheckoutStore()
const { hasChanged, promoCode, note } = storeToRefs(cart)

const checkoutProcess = ref(false)

function openSignInModal () {
  modal.open({
    title: 'Sign In to Checkout',
    component: SignInModal,
    componentProps: {
      refUrl: window.location.href
    }
  })
}

async function onGetPromo () {
  if (promoCode.value.length > 0) {
    return await cart.getPromo()
  }
}

async function onApplyPromoCode () {
  if (cartItems.value?.length) {
    await refreshPromo()

    if (promo.value?.success) {
      toast.add({
        title: `Congratulations! You get a ${promo.value.discount_percentage}% discount`,
        color: 'yellow'
      })
    } else {
      toast.add({
        title: `The Promo Code you apply are either invalid or expired`,
        color: 'red'
      })
    }
  }
}

async function handleCheckout () {
  if (cartItems.value && cartItems.value.length > 0) {
    try {
      const { snap_url } = await checkout.create({
        items: cartItems.value,
        note: note.value,
        promo_code: promo.value?.success
          ? promoCode.value.toLowerCase()
          : ''
      })
  
      if (snap_url) {
        cart.empty()
        window.open(snap_url)
      }
    } catch (err: any) {
      toast.add({
        title: 'A problem has occurred while processing the checkout. Please try again',
        color: 'red'
      })
    }
  } else {
    toast.add({
      title: "Checkout error. Cart is empty",
      color: 'red'
    })
  }
}

async function onCheckout () {
  try {
    checkoutProcess.value = true
    await auth.authorize().then(() => handleCheckout())
  } catch {
    openSignInModal()
  } finally {
    checkoutProcess.value = false
  }
}

const { data: cartItems } = await useAsyncData(
  'cartItems', () => cart.getItems(), {
    watch: [hasChanged]
  }
)

const { data: subtotal } = await useAsyncData(
  'subtotal', () => cart.getSubtotal(), {
    watch: [cartItems]
  }
)

const { data: promo, refresh: refreshPromo } = await useAsyncData(
  'promo', () => onGetPromo(), {
    watch: [subtotal]
  }
)

const total = computed(() => {
  const subtotalValue = subtotal.value || 0
  const promoValue = promo.value?.discount_amount || 0
  return subtotalValue - promoValue
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
              <ClientOnly>
                <template #fallback>
                  <p class="text-center">
                    Loading cart ...
                  </p>
                </template>

                <p v-if="!cartItems?.length" class="text-center">
                  Cart is empty. <NuxtLink to="/shop/all" class="font-bold">Go shopping</NuxtLink>
                </p>
  
                <CartItem
                  v-for="item in cartItems"
                  :key="item.id"
                  :item="item"
                />
              </ClientOnly>
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
                  :label="promo?.success ? 'Success' : 'Apply'"
                  :color="promo?.success ? 'black' : 'yellow'"
                  size="xl"
                  :disabled="promoCode.length < 1"
                  @click="onApplyPromoCode"
                />
              </div>
              <UFormGroup label="Note">
                <UTextarea
                  v-model="note"
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
                <p>{{ Rp(subtotal) }}</p>
              </div>
              <div v-if="promo?.success" class="text-lg flex items-center justify-between gap-2">
                <p>Discount</p>
                <p>-{{ Rp(promo.discount_amount) }}</p>
              </div>
              <hr class="border-black">
              <div class="mt-4 text-xl flex items-center justify-between gap-2">
                <p>Total</p>
                <strong>{{ Rp(total) }}</strong>
              </div>
            </div>
            <div class="mt-8">
              <UButton
                block
                label="Checkout"
                color="black"
                size="xl"
                :disabled="!cartItems || cartItems.length < 1"
                :loading="checkoutProcess"
                @click="onCheckout"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>