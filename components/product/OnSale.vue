<script setup lang="ts">
const props = defineProps<{
  product: Product
}>()

const { storageBaseUrl } = useRuntimeConfig().public

const finalPrice = computed(() => {
  const discount_percentage = props.product.discount_percentage
  const price = props.product.price
  const discountedAmount = (discount_percentage / 100) * price
  return price - discountedAmount
})

const isNewRelease = computed(() => isNewReleasedProduct(props.product.created_at))
</script>

<template>
  <NuxtLink
    :to="`/product/${product.category}/${product.slug}`"
    tag="div"
    class="relative transition-transform bg-gradient-to-b from-transparent via-transparent to-yellow-100 hover:scale-105"
  >
    <div class="p-4 space-y-4">
      <img
        :src="`${storageBaseUrl + product.image}`"
        :alt="product.name"
        width="1000"
        height="1000"
      >
      <div class="space-y-2">
        <h3 class="text-base md:text-lg line-clamp-2">
          {{ product.name }}
        </h3>
        <div class="flex flex-wrap md:flex-nowrap gap-1 md:gap-2">
          <s v-if="product.discount_percentage > 0">{{ Rp(product.price) }}</s>
          <p>{{ Rp(finalPrice) }}</p>
        </div>
      </div>
    </div>

    <div class="absolute left-0 top-0">
      <div class="flex flex-wrap gap-1 text-xs md:text-base">
        <div v-if="isNewRelease" class="py-1 px-3 border border-black bg-teal-200 shadow-lg">
          New
        </div>
        <div v-if="product.discount_percentage > 0" class="py-1 px-3 border border-black bg-yellow-300 shadow-lg">
          -{{ product.discount_percentage }}%
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
