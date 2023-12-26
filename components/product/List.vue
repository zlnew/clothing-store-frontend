<script setup lang="ts">
const props = defineProps<{
  product: Product
}>()

const config = useAppConfig()

const finalPrice = computed(() => {
  const discount = props.product.discount || 0
  const price = props.product.price
  const discountedPrice = (discount / 100) * price
  return price - discountedPrice
})

const isNewRelease = computed(() => isNewReleasedProduct(props.product.created_at))
</script>

<template>
  <NuxtLink
    :to="`/product/${product.category}/${product.slug}`"
    tag="div"
    class="relative transition-transform hover:scale-105"
  >
    <div class="space-y-4">
      <img
        :src="`${config.storageApiBaseUrl + product.image}`"
        :alt="product.name"
        width="1000"
        height="1000"
      >
      <div>
        <h3 class="text-base md:text-lg line-clamp-2">{{ product.name }}</h3>
        <div class="flex gap-2">
          <s v-if="product.discount">${{ product.price.toFixed(2) }}</s>
          <p>${{ finalPrice.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <div class="absolute left-0 top-0">
      <div class="flex flex-wrap gap-1 text-xs md:text-base">
        <div v-if="isNewRelease" class="py-1 px-3 border border-black bg-teal-200 shadow-lg">
          New
        </div>
        <div v-if="product.discount" class="py-1 px-3 border border-black bg-yellow-300 shadow-lg">
          -{{ product.discount }}%
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
