<script setup lang="ts">
const product = useProductStore()

async function getProducts () {
  return await product.all({
    on_sale: true
  })
}

const { data: productsData } = await useAsyncData(
  'onSaleProducts', () => product.all({on_sale: true})
)
</script>

<template>
  <UContainer>
    <div class="flex-col space-y-4">
      <h2 class="text-2xl lg:text-3xl text-center">
        On sale now!
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
