<script setup lang="ts">
const router = useRouter()
const cart = useCartStore()
const { slideover, hasChanged } = storeToRefs(cart)

const { data: cartItems, execute: fetchCart } = await useAsyncData(
  'cart_items',
  () => cart.getItems(), {
    watch: [hasChanged]
  }
)

const { data: subtotal, execute: fetchSubtotal } = await useAsyncData(
  'subtotal',
  () => cart.getSubtotal(), {
    watch: [cartItems]
  }
)

onMounted(async () => {  
  router.beforeEach(() => { slideover.value = false })
  await fetchCart()
  await fetchSubtotal()
})
</script>

<template>
  <div>
    <UChip
      :text="cartItems?.length || 0"
      color="gray"
      size="3xl"
      :ui="{
        base: 'ring-black text-black',
        background: 'bg-yellow-300'
      }"
    >
      <UButton
        icon="i-mdi-cart-outline"
        :color="$route.path === '/cart' ? 'yellow' : 'black'"
        :variant="$route.path === '/cart' ? 'solid' : 'outline'"
        size="lg"
        @click="slideover = true"
      />
    </UChip>

    <USlideover v-model="slideover">
      <div>
        <div class="p-8 border-b border-black flex items-center justify-between">
          <p class="text-2xl font-semibold">Shopping Cart</p>
          <UButton
            color="black"
            variant="outline"
            icon="i-mdi-close"
            @click="slideover = false"
          />
        </div>

        <div class="p-8">
          <div class="space-y-8">
            <p v-if="cartItems && cartItems.length < 1" class="text-lg text-center">
              Cart is empty. <NuxtLink to="/shop/all" class="font-bold">Go shopping</NuxtLink>
            </p>

            <div v-else class="flex flex-col gap-8">
              <CartSlideoverItem
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
              />
              <hr class="border-black">
            </div>

            <div class="flex items-center justify-between">
              <p class="text-2xl">Subtotal: <strong>${{ subtotal?.toFixed(2) }}</strong></p>
              <UButton
                trailing
                to="/cart"
                icon="i-mdi-arrow-right"
                label="View Cart"
                color="yellow"
                size="xl"
              />
            </div>
          </div>
        </div>
      </div>
    </USlideover>
  </div>
</template>
