<script setup lang="ts">
const router = useRouter()
const isOpen = ref(false)

onMounted(() => {
  router.beforeEach(() => {
    isOpen.value = false
  })
})
</script>

<template>
  <div>
    <UButton
      icon="i-mdi-reorder-horizontal"
      color="black"
      variant="outline"
      size="lg"
      @click="isOpen = true"
    />

    <USlideover v-model="isOpen">
      <div>
        <div class="p-8 border-b border-black flex items-center justify-between">
          <div class="w-fit border border-black bg-yellow-300 p-2">
            <NuxtLink to="/">
              <p class="text-2xl font-normal">Zee Apparel</p>
            </NuxtLink>
          </div>
          <UButton
            color="black"
            variant="outline"
            icon="i-mdi-close"
            @click="isOpen = false"
          />
        </div>

        <div class="p-8 border-b border-black">
          <div class="space-y-8">
            <div class="space-y-4">
              <p class="font-bold text-2xl">Category</p>
              <ul class="text-xl space-y-2">
                <li>
                  <NuxtLink exact-active-class="font-bold" to="/shop/all">
                    <div class="flex items-center">
                      <UIcon name="i-mdi-menu-right" /> All
                    </div>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink exact-active-class="font-bold" to="/shop/men">
                    <div class="flex items-center">
                      <UIcon name="i-mdi-menu-right" /> Men
                    </div>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink exact-active-class="font-bold" to="/shop/women">
                    <div class="flex items-center">
                      <UIcon name="i-mdi-menu-right" /> Women
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="p-8 border-b border-black">
          <div class="space-y-4">
            <p class="font-bold text-2xl">Hi, Maulana</p>
            <ul class="text-xl space-y-2">
              <li>
                <NuxtLink exact-active-class="font-bold" to="/profile">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> My Profile
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink exact-active-class="font-bold" to="/order">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> My Order
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink exact-active-class="font-bold" to="/cart">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> Shopping Cart
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="p-8">
          <!-- <SignIn /> -->
          <SignOut />
        </div>
      </div>
    </USlideover>
  </div>
</template>
