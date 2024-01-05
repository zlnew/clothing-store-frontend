<script setup lang="ts">
const { get } = useProduct()

const { data: products } = await useAsyncData(
  'newReleasedProducts', () => get({ new_release: true })
)
</script>

<template>
  <UContainer v-if="!!products">
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
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </UContainer>
</template>
