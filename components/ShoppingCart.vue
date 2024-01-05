<script setup lang="ts">
import SignInModal from './modals/SignInModal.vue'

const router = useRouter()
const modal = useModal()
const { user } = useAuth()
const { items, subtotal, slideover } = useShoppingCart()

function handleSlideover () {
  if (!user.value) {
    modal.open({
      title: 'Sign In to Zee Apparel',
      component: SignInModal,
      componentProps: {
        refUrl: window.location.href
      }
    })
  } else {
    slideover.value = true
  }
}

onMounted(() => router.beforeEach(() => { slideover.value = false }))
</script>

<template>
  <div class="flex flex-col items-center">
    <UChip
      :text="items?.length || 0"
      color="gray"
      size="3xl"
      :ui="{ base: 'ring-black text-black', background: 'bg-yellow-300' }"
    >
      <UButton
        icon="i-mdi-cart-outline"
        color="black"
        variant="outline"
        size="lg"
        @click="handleSlideover"
      />
    </UChip>

    <USlideover v-model="slideover">
      <div class="h-full flex flex-col justify-between">
        <div class="p-8 border-b border-black flex items-center justify-between">
          <p class="text-2xl font-semibold">
            Shopping Cart
          </p>
          <UButton
            color="black"
            variant="outline"
            icon="i-mdi-close"
            @click="slideover = false"
          />
        </div>

        <div class="p-8 h-full flex flex-col justify-start gap-4">
          <p v-if="!items?.length" class="text-lg text-center">
            Cart is empty. <NuxtLink to="/shop/all" class="font-bold">
              Go shopping
            </NuxtLink>
          </p>

          <div v-else class="flex flex-col gap-8">
            <CartItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </div>
        </div>

        <div class="p-8 border-t border-black flex items-center justify-between gap-4">
          <p class="text-2xl">
            Subtotal: <strong>{{ Rp(subtotal) }}</strong>
          </p>
          <UButton
            trailing
            to="/shopping-cart"
            icon="i-mdi-arrow-right"
            label="View Cart"
            color="yellow"
            size="xl"
          />
        </div>
      </div>
    </USlideover>
  </div>
</template>
