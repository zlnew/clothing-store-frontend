<script setup lang="ts">
const product = useProductStore()

const { data: productsData } = await useAsyncData(
  'newReleasedProducts', () => product.all({new_release: true})
)
</script>

<template>
  <UContainer>
    <div class="flex-col space-y-4">
      <div class="flex justify-between items-center gap-4">
        <h2 class="text-2xl lg:text-3xl text-center">
          New Release
        </h2>
        <UButton
          to="/shop/all"
          label="See All"
          color="black"
          variant="link"
          size="xl"
          :padded="false"
          class="uppercase"
        />
      </div>
  
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <ProductNewRelease
          v-for="product in productsData"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </UContainer>
</template>
