<script setup lang="ts">
import { capitalize } from 'vue'

const accordionItems = [
  {
    defaultOpen: true,
    slot: 'product-info',
    label: 'Product Info'
  },
  {
    label: 'Return & Refund Policy',
    content: "I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence."
  },
  {
    label: 'Shipping Info',
    content: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence."
  }
]

const { storageBaseUrl } = useRuntimeConfig().public
const route = useRoute()
const cart = useShoppingCart()
const { show } = useProduct()

const selectedSize = ref<string>()
const quantity = ref(1)

async function handleGetProduct () {
  const slug = (route.params.slug && typeof route.params.slug === 'string')
    ? route.params.slug
    : ''
  return await show(slug)
}

async function handleAddToCart () {
  if (product.value && selectedSize.value) {
    await cart.store({
      product_id: product.value.id,
      quantity: quantity.value,
      size: selectedSize.value
    })
  }
}

const { data: product } = useAsyncData(
  'product', () => handleGetProduct()
)

const { submit: addToCart } = useSubmit(
  () => handleAddToCart()
)

function handleQuantity (value: number) {
  const stock = product.value?.stock

  if (stock && value <= stock) {
    quantity.value = value
  } else {
    quantity.value = 1
  }
}

const finalPrice = computed(() => {
  const discount_percentage = product.value?.discount_percentage || 0
  const price = product.value?.price || 0
  const discountedAmount = (discount_percentage / 100) * price
  return price - discountedAmount
})

const isNewRelease = computed(() => isNewReleasedProduct(product.value?.created_at || ''))

useSeoMeta({
  title: () => product.value?.name || 'Product not found'
})
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-4xl' }">
    <div class="mt-8 md:mt-14 mb-8">
      <div v-if="product" class="space-y-8">
        <UBreadcrumb
          divider="/"
          :links="[
            { label: 'Home', to: '/' },
            { label: capitalize(product.category), to: `/shop/${product.category}` },
            { label: product.name }
          ]"
          :ui="{ active: 'text-black' }"
        />
    
        <div class="grid md:grid-cols-2 items-start gap-8">
          <div class="flex justify-center">
            <img
              :src="`${storageBaseUrl + product.image}`"
              :alt="product.name"
              width="1000"
              height="1000"
            >
          </div>
    
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="text-3xl">{{ product.name }}</h2>
              <div class="flex gap-2 text-sm">
                <div class="py-1 px-3 border border-black bg-white">
                  {{ (product.stock > 0) ? `${product.stock} left` : 'Out of stock' }}
                </div>
                <div v-if="isNewRelease" class="py-1 px-3 border border-black bg-teal-200">
                  New
                </div>
                <div v-if="product.discount_percentage > 0" class="py-1 px-3 border border-black bg-yellow-300">
                  -{{ product.discount_percentage }}%
                </div>
              </div>
            </div>
            
            <div class="flex gap-2 text-2xl">
              <s v-if="product.discount_percentage > 0">{{ Rp(product.price) }}</s>
              <p>{{ Rp(finalPrice) }}</p>
            </div>
    
            <URadioGroup
              v-if="typeof product.sizes === 'object'"
              v-model="selectedSize"
              color="yellow"
              legend="Choose size"
              :options="product.sizes"
              :disabled="product.stock < 1"
            >
              <template #label="{ option }">
                <p class="text-base">
                  {{ option.label }}
                </p>
              </template>
            </URadioGroup>
    
            <div class="bg-white grid grid-cols-8 items-end gap-2">
              <div class="col-span-2">
                <UFormGroup label="Quantity">
                  <UInput
                    type="number"
                    size="xl"
                    :model-value="quantity"
                    :min="1"
                    :max="product.stock"
                    :disabled="product.stock < 1"
                    :ui="{ rounded: 'rounded-none'}"
                    @update:model-value="handleQuantity"
                  />
                </UFormGroup>
              </div>
              <div class="col-span-6">
                <UButton
                  block
                  label="ADD TO CART"
                  color="black"
                  size="xl"
                  :disabled="(selectedSize === undefined || quantity < 1) || product.stock < 1"
                  @click="addToCart"
                />
              </div>
            </div>
    
            <UAccordion :items="accordionItems">
              <template #default="{ item, open }">
                <UButton
                  color="black"
                  variant="ghost"
                  class="border-t border-black"
                  :ui="{ rounded: 'rounded-none', padding: { sm: 'px-0 py-4' } }"
                >
                  <span class="truncate uppercase text-lg">{{ item.label }}</span>
    
                  <template #trailing>
                    <UIcon
                      name="i-heroicons-chevron-right-20-solid"
                      class="w-5 h-5 ms-auto transform transition-transform duration-200"
                      :class="[open && 'rotate-90']"
                    />
                  </template>
                </UButton>
              </template>

              <template #product-info>
                <p class="text-lg text-black">{{ product.description }}</p>
              </template>
    
              <template #item="{ item }">
                <p class="text-lg text-black">{{ item.content }}</p>
              </template>
            </UAccordion>
          </div>
        </div>
      </div>

      <div v-else class="text-center mb-14">
        <p>Product not found</p>
      </div>
    </div>
  </UContainer>
</template>
