<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Shopping Cart' })

const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shopping Cart' }
]

const { items, subtotal, discount, checkoutData, getDiscount } = useShoppingCart()
const { store } = useTransaction()

const { submit: checkout, processing, validationMessage } = useSubmit(
  () => store(checkoutData.value), {
    onSuccess: () => {
      window.location.href = '/my-order/active'
    }
  }
)

const amount = computed(() => {
  const discountAmount = (discount.value.percentage / 100) * subtotal.value
  const total = subtotal.value - discountAmount

  return {
    subtotal: subtotal.value,
    discountAmount,
    total
  }
})

async function handleApplyPromoCode () {
  if (checkoutData.value.voucher_code) {
    await getDiscount(checkoutData.value.voucher_code)
  }
}
</script>

<template>
  <PageContainer :breadcrumb-links="breadcrumbLinks">
    <ErrorNotification :message="validationMessage" @close="validationMessage = null" />

    <div class="grid md:grid-cols-3 gap-14">
      <div class="md:col-span-2 flex flex-col gap-4">
        <div v-if="!items?.length" class="min-h-48 flex items-center justify-center">
          <p>Your shopping cart is empty</p>
        </div>

        <div v-else class="flex flex-col gap-8 min-h-48">
          <CartItem
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>

        <hr class="border-black">

        <div class="flex flex-col gap-4">
          <DiscountNotification :message="discount.message" @close="discount.message = null" />

          <div class="flex items-end gap-1">
            <UFormGroup label="Promo Code" class="w-full">
              <UInput
                v-model="checkoutData.voucher_code"
                size="xl"
                input-class="uppercase"
                @keyup.enter="handleApplyPromoCode"
              />
            </UFormGroup>
            <UButton
              label="Apply"
              color="black"
              variant="outline"
              size="xl"
              :disabled="!checkoutData.voucher_code"
              @click="handleApplyPromoCode"
            />
          </div>

          <UFormGroup label="Note (Optional)">
            <UTextarea
              v-model="checkoutData.note"
              placeholder="Add a note"
              size="xl"
            />
          </UFormGroup>
        </div>
      </div>

      <hr class="md:hidden border-dashed border-black">

      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <div class="text-lg flex items-center justify-between gap-2">
            <p>Subtotal</p>
            <p>{{ Rp(amount.subtotal) }}</p>
          </div>

          <div class="text-lg flex items-center justify-between gap-2">
            <p>Discount</p>
            <p>-{{ Rp(amount.discountAmount) }}</p>
          </div>

          <hr class="border-black">

          <div class="text-xl flex items-center justify-between gap-2">
            <p>Total</p>
            <strong>{{ Rp(amount.total) }}</strong>
          </div>
        </div>

        <UButton
          block
          label="Checkout"
          color="yellow"
          size="xl"
          class="uppercase"
          :disabled="!items?.length"
          :loading="processing"
          @click="checkout"
        />
      </div>
    </div>
  </PageContainer>
</template>
