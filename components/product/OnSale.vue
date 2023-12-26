<script setup lang="ts">
import type { Product } from '~/resources'

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink
    :to="`/product/${product.category.toLowerCase()}/${product.slug}`"
    tag="div"
    class="relative transition-transform bg-gradient-to-b from-transparent via-transparent to-yellow-100 hover:scale-105"
  >
    <div class="p-4 space-y-4">
      <img
        :src="product.image"
        :alt="product.name"
        width="1000"
        height="1000"
      >
      <div>
        <h3 class="text-base md:text-lg line-clamp-2">{{ product.name }}</h3>
        <p>${{ product.price.toFixed(2) }}</p>
      </div>
    </div>

    <div class="absolute left-0 top-0">
      <div class="flex flex-wrap gap-1 text-xs md:text-base">
        <div v-if="product.best_seller" class="py-1 px-3 border border-black bg-black text-yellow-300 shadow-lg">
          Best Seller
        </div>
        <div v-if="product.new_release" class="py-1 px-3 border border-black bg-teal-200 shadow-lg">
          New
        </div>
        <div v-if="product.on_sale" class="py-1 px-3 border border-black bg-yellow-300 shadow-lg">
          -{{ product.on_sale }}%
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
