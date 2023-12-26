<script setup lang="ts">
import type { CartItemWithProduct } from '~/stores/useCartStore'

const props = defineProps<{
  item: CartItemWithProduct
}>()

const cart = useCartStore()

const quantity = computed({
  get() {
    return props.item.quantity
  },
  set(newValue) {
    props.item.quantity = newValue
  }
})

function onQuantityChange (newQuantity: number) {
  const item = { ...props.item, quantity: newQuantity }
  cart.update(item)
}

function deleteItem () {
  const { id, size } = props.item
  cart.remove({id, size})
}
</script>

<template>
  <div class="group relative grid grid-cols-6 items-start gap-4">
    <img
      :src="item.product.image"
      :alt="item.product.name"
      width="500"
      height="500"
    >
    <div class="col-span-3 space-y-2">
      <div>
        <NuxtLink :to="`/product/${item.product.category.toLowerCase()}/${item.product.slug}`">
          <h4 class="line-clamp-2">{{ item.product.name }} - {{ item.size }}</h4>
        </NuxtLink>
        <p>${{ item.product.price.toFixed(2) }}</p>
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
    <p class="text-lg">${{ (quantity * item.product.price).toFixed(2) }}</p>
    <div class="text-right">
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