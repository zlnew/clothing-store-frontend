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
  'product',
  () => getProduct()
)

useSeoMeta({
  title: () => {
    return productData.value?.name || ''
  }
})

function addToCart () {
  if (productData.value) {
    const item = {
      id: productData.value.id,
      quantity: quantity.value,
      size: selectedSize.value
    }
    cart.add(item)
    slideover.value = true
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
    
          <div class="space-y-4">
            <div class="space-y-2">
              <h2 class="text-3xl">{{ productData.name }}</h2>
              <p class="text-2xl">
                ${{ productData.price.toFixed(2) }}
              </p>
            </div>
    
            <URadioGroup
              v-model="selectedSize"
              color="yellow"
              legend="Choose size"
              :options="productData.sizes"
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
                    v-model="quantity"
                    size="xl"
                    :ui="{ rounded: 'rounded-none'}"
                  />
                </UFormGroup>
              </div>
              <div class="col-span-6">
                <UButton
                  block
                  label="ADD TO CART"
                  color="black"
                  size="xl"
                  :disabled="selectedSize === undefined || quantity < 1"
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
