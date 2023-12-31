<script setup lang="ts">
import { capitalize } from 'vue'

const route = useRoute()
const product = useProductStore()

definePageMeta({
  validate: async (route) => {
    const categories = ['all', 'men', 'women']
    return (typeof route.params.category === 'string')
      ? categories.includes(route.params.category)
      : false
  }
})

useSeoMeta({
  title: () => {
    return (typeof route.params.category === 'string')
      ? `${capitalize(route.params.category)} Category`
      : ''
  }
})

const search = ref('')

async function getProducts () {
  const categoryParam = (route.params.category && typeof route.params.category === 'string')
    ? route.params.category
    : 'all'

  const params = {
    category: categoryParam,
    search: search.value
  }

  return await product.all(params)
}

const { data: productsData } = await useAsyncData(
  'products', () => getProducts(), {
    watch: [route, search]
  }
)
</script>

<template>
  <div class="mb-14">
    <div class="h-24 md:h-48 flex flex-col justify-center items-center tracking-wide bg-gradient-to-b from-yellow-300 to-white">
      <span class="capitalize text-4xl md:text-7xl font-light tracking-widest">
        {{ $route.params.category }} Category
      </span>
    </div>
  
    <UContainer>
      <div class="flex-col space-y-4">
        <input
          type="search"
          v-model="search"
          placeholder="Search product"
          class="py-4 w-full text-lg md:text-2xl border-b border-black focus:outline-none"
        >
    
        <div v-if="productsData?.length" class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ProductList
            v-for="product in productsData"
            :key="product.id"
            :product="product"
          />
        </div>
    
        <div v-else class="h-96 flex items-center justify-center">
          No products found
        </div>
      </div>
    </UContainer>
  </div>
</template>
