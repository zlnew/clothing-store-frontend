<script setup lang="ts">
const router = useRouter()
const { user } = useAuth()
const isOpen = ref(false)

onMounted(() => { router.beforeEach(() => { isOpen.value = false }) })
</script>

<template>
  <div class="flex flex-col items-center">
    <UButton
      color="black"
      variant="ghost"
      size="lg"
      :padded="false"
      @click="isOpen = true"
    >
      <ClientOnly>
        <UChip :show="!!user">
          <UAvatar
            size="md"
            :icon="user ? undefined : 'i-mdi-person'"
            :alt="user ? user.name : 'Avatar'"
            class="border border-black"
          />
        </UChip>

        <template #fallback>
          <UAvatar
            size="md"
            icon="i-mdi-person"
            alt="Avatar"
            class="border border-black"
          />
        </template>
      </ClientOnly>
    </UButton>

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

        <div v-if="user" class="p-8 border-b border-black">
          <div class="space-y-4">
            <p class="font-bold text-2xl">
              Hi, {{ user.name }}
            </p>
            <ul class="text-xl space-y-2">
              <li>
                <NuxtLink exact-active-class="font-bold" to="/my-profile">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> My Profile
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink exact-active-class="font-bold" to="/my-order/active">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> My Order
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink exact-active-class="font-bold" to="/shopping-cart">
                  <div class="flex items-center">
                    <UIcon name="i-mdi-menu-right" /> Shopping Cart
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="p-8">
          <SignOut v-if="user" />
          <SignIn v-else @modal-open="isOpen = false" />
        </div>
      </div>
    </USlideover>
  </div>
</template>
