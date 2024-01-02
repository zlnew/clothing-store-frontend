<script setup lang="ts">
import { capitalize } from 'vue'
import debounce from 'lodash.debounce'

const route = useRoute()
const { get } = useProduct()

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
const searching = ref(false)

const { data: products, refresh } = await useAsyncData(
  'products', () => handleGetProducts(), {
    watch: [route]
  }
)

async function handleGetProducts () {
  const categoryParam = (route.params.category && typeof route.params.category === 'string')
    ? route.params.category
    : 'all'
  const searchQuery = search.value

  return get({
    category: categoryParam,
    search: searchQuery
  })
}

const debounceSearch = debounce(async () =>{
  await refresh()
  searching.value = false
}, 500)

async function handleSearch () {
  searching.value = true
  await debounceSearch()
}
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
          @input="handleSearch"
        >
        <div class="min-h-96" :class="{ 'flex items-center justify-center': searching || !products?.length }">
          <p v-if="searching">Searching product ...</p>
          <div v-else :class="{ 'grid grid-cols-2 md:grid-cols-4 gap-8': products?.length }">
            <p v-if="!products?.length">No products found</p>        
            <ProductList
              v-else
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
