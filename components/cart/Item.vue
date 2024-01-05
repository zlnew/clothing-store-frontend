<script setup lang="ts">
const props = defineProps<{
  item: ShoppingCartItem
}>()

const { storageBaseUrl } = useRuntimeConfig().public
const { update, destroy } = useShoppingCart()

const quantity = ref(props.item.quantity)

const finalPrice = computed(() => {
  const discount_percentage = props.item.product.discount_percentage
  const price = props.item.product.price
  const discountedAmount = (discount_percentage / 100) * price
  return price - discountedAmount
})

const { submit: updateItem } = useSubmit(
  () => update({
    id: props.item.id,
    product_id: props.item.product_id,
    quantity: quantity.value
  })
)

const { submit: destroyItem } = useSubmit(
  () => destroy(props.item.id)
)

async function onQuantityChange (newQuantity: number) {
  quantity.value = newQuantity
  await updateItem()
}
</script>

<template>
  <div class="group relative grid grid-cols-6 items-start gap-4">
    <img
      :src="`${storageBaseUrl}/${item.product.image}`"
      :alt="item.product.name"
      width="500"
      height="500"
    >

    <div class="col-span-3 space-y-2">
      <div>
        <NuxtLink :to="`/product/${item.product.category}/${item.product.slug}`">
          <h4 class="line-clamp-2">
            {{ item.product.name }} - {{ item.size }}
          </h4>
        </NuxtLink>
        <div class="flex gap-2">
          <s v-if="item.product.discount_percentage > 0">{{ Rp(item.product.price) }}</s>
          <p>{{ Rp(finalPrice) }}</p>
        </div>
      </div>
      <CartItemQuantity
        :quantity="item.quantity"
        :stock="item.product.stock"
        @update:quantity="onQuantityChange"
      />
    </div>

    <p>{{ Rp(quantity * finalPrice) }}</p>

    <div class="text-right">
      <UButton
        icon="i-mdi-close"
        color="black"
        variant="ghost"
        size="xs"
        @click="destroyItem"
      />
    </div>
  </div>
</template>
