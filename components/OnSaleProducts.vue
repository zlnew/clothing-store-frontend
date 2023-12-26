<script setup lang="ts">
import { products } from '~/resources'

async function getProducts () {
  return products.filter(item => {
    return item.on_sale === true || typeof item.on_sale === 'number'
  })
}

const { data: productsData } = await useAsyncData(
  'on_sale_products',
  () => getProducts()
)
</script>

<template>
  <UContainer>
    <div class="flex-col space-y-4">
      <h2 class="text-2xl lg:text-3xl text-center">
        New year sale is on!
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <ProductOnSale
          v-for="product in productsData"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </UContainer>
</template>
~/resources