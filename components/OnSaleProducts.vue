<script setup lang="ts">
const { get } = useProduct()

const { data: products } = await useAsyncData(
  'onSaleProducts', () => get({ on_sale: true })
)
</script>

<template>
  <UContainer v-if="!!products">
    <div class="flex-col space-y-4">
      <h2 class="text-2xl lg:text-3xl text-center">
        On sale now!
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <ProductOnSale
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </UContainer>
</template>
