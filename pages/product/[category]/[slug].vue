<script setup lang="ts">
import { capitalize } from 'vue'

const config = useAppConfig()
const route = useRoute()
const cart = useCartStore()
const product = useProductStore()
const { slideover } = storeToRefs(cart)

const selectedSize = ref()
const quantity = ref(1)

const accordionItems = [{
    defaultOpen: true,
    slot: 'product-info',
    label: 'Product Info'
  }, {
    label: 'Return & Refund Policy',
    content: "I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence."
  }, {
    label: 'Shipping Info',
    content: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence."
}]

async function getProduct () {
  const slug = (route.params.slug && typeof route.params.slug === 'string')
    ? route.params.slug
    : ''
  return await product.show(slug)
}

const { data: productData } = await useAsyncData(
  'product', () => getProduct()
)

const finalPrice = computed(() => {
  const discount_percentage = productData.value?.discount_percentage || 0
  const price = productData.value?.price || 0
  const discountedAmount = (discount_percentage / 100) * price
  return price - discountedAmount
})

const isNewRelease = computed(() => isNewReleasedProduct(productData.value?.created_at || ''))

useSeoMeta({
  title: () => {
    return productData.value?.name || 'Product not found'
  }
})

function addToCart () {
  if (productData.value) {
    const item = {
      id: productData.value.id,
      name: productData.value.name,
      quantity: quantity.value,
      price: finalPrice.value,
      size: selectedSize.value
    }
    cart.add(item)
    slideover.value = true
  }
}

function handleQuantity (value: number) {
  const stock = productData.value?.stock

  if (stock && value <= stock) {
    quantity.value = value
  } else {
    quantity.value = 1
  }
}
</script>

<template>
  <div class="mt-8 md:mt-14 mb-8">
    <UContainer :ui="{ constrained: 'max-w-4xl' }">
      <div v-if="productData" class="space-y-8">
        <UBreadcrumb
          divider="/"
          :links="[{
              label: 'Home',
              to: '/'
            }, {
              label: capitalize(productData.category),
              to: `/shop/${productData.category}`
            }, {
              label: productData.name
            }
          ]"
          :ui="{
            active: 'text-black'
          }"
        />
    
        <div class="grid md:grid-cols-2 items-start gap-8">
          <div class="flex justify-center">
            <img
              :src="`${config.storageApiBaseUrl + productData.image}`"
              :alt="productData.name"
              width="1000"
              height="1000"
            >
          </div>
    
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="text-3xl">{{ productData.name }}</h2>
              <div class="flex gap-2 text-sm">
                <div class="py-1 px-3 border border-black bg-white">
                  {{ (productData.stock > 0) ? `${productData.stock} left` : 'Out of stock' }}
                </div>
                <div v-if="isNewRelease" class="py-1 px-3 border border-black bg-teal-200">
                  New
                </div>
                <div v-if="productData.discount_percentage > 0" class="py-1 px-3 border border-black bg-yellow-300">
                  -{{ productData.discount_percentage }}%
                </div>
              </div>
            </div>
            
            <div class="flex gap-2 text-2xl">
              <s v-if="productData.discount_percentage > 0">{{ Rp(productData.price) }}</s>
              <p>{{ Rp(finalPrice) }}</p>
            </div>
    
            <URadioGroup
              v-if="typeof productData.sizes === 'object'"
              v-model="selectedSize"
              color="yellow"
              legend="Choose size"
              :options="productData.sizes"
              :disabled="productData.stock < 1"
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
                    :max="productData.stock"
                    :disabled="productData.stock < 1"
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
                  :disabled="(selectedSize === undefined || quantity < 1) || productData.stock < 1"
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
                <p class="text-lg text-black">
                  {{ productData.description }}
                </p>
              </template>
    
              <template #item="{ item }">
                <p class="text-lg text-black">
                  {{ item.content }}
                </p>
              </template>
            </UAccordion>
          </div>
        </div>
      </div>

      <div v-else class="text-center mb-14">
        <p>Product not found</p>
      </div>
    </UContainer>
  </div>
</template>
