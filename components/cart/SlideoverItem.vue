<script setup lang="ts">
import type { CartItemWithProduct } from '~/stores/useCartStore'

const props = defineProps<{
  item: CartItemWithProduct
}>()

const config = useAppConfig()
const cart = useCartStore()

const quantity = computed({
  get: () => props.item.quantity,
  set(newValue) {
    props.item.quantity = newValue
  }
})

const finalPrice = computed(() => {
  const discount_percentage = props.item.product.discount_percentage
  const price = props.item.product.price
  const discountedAmount = (discount_percentage / 100) * price
  return price - discountedAmount
})

function onQuantityChange (quantity: number) {
  cart.update({ ...props.item, quantity })
}

function deleteItem () {
  const { id, size } = props.item
  cart.remove({id, size})
}
</script>

<template>
  <div class="group relative grid grid-cols-6 items-start gap-4">
    <img
      :src="`${config.storageApiBaseUrl}/${item.product.image}`"
      :alt="item.product.name"
      width="500"
      height="500"
    >
    <div class="col-span-4 space-y-2">
      <div>
        <NuxtLink :to="`/product/${item.product.category}/${item.product.slug}`">
          <h4 class="line-clamp-2">{{ item.product.name }} - {{ item.size }}</h4>
        </NuxtLink>
        <div class="flex gap-2">
          <s v-if="item.product.discount_percentage > 0">{{ Rp(item.product.price) }}</s>
          <p>{{ Rp(finalPrice) }}</p>
        </div>
      </div>
      <div class="max-w-16">
        <UInput
          type="number"
          v-model="quantity"
          size="xs"
          @update:model-value="onQuantityChange"
        />
      </div>
    </div>

    <div class="md:hidden md:group-hover:block text-right">
      <UButton
        icon="i-mdi-close"
        color="black"
        variant="ghost"
        size="xs"
        @click="deleteItem"
      />
    </div>
  </div>
</template>
