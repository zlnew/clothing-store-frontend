<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'transaction-status'] })
useSeoMeta({ title: 'My Order' })

const breadcrumbsLinks = [
  { label: 'Home', to: '/' },
  { label: 'My Order' }
]

const statusButtons = [
  { to: '/my-order/active', label: 'Active', key: 'active' },
  { to: '/my-order/cancelled', label: 'Cancelled', key: 'cancelled' },
  { to: '/my-order/finished', label: 'Finished', key: 'finished' }
]

const route = useRoute()
const status = route.params.status as string
const { get } = useTransaction()

const { data: orders, refresh, pending } = await useAsyncData(
  'orders', () => get(status)
)
</script>

<template>
  <PageContainer :breadcrumb-links="breadcrumbsLinks">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <UButton
          v-for="{ key, to, label } in statusButtons"
          :key="key"
          :to="to"
          :label="label"
          :color="$route.path === to ? 'yellow' : 'black'"
          :variant="$route.path === to ? 'solid' : 'outline'"
        />
      </div>
      <UButton
        icon="i-heroicons-arrow-path-20-solid"
        label="Refresh"
        color="black"
        variant="ghost"
        :loading="pending"
        @click="refresh"
      />
    </div>
    
    <div v-if="!orders?.length" class="h-96 flex justify-center items-center">
      <p>{{ pending ? 'Getting all your orders...' : "You don't have an order yet" }}</p>
    </div>
    
    <div v-else class="min-h-96 flex flex-col gap-4">
      <OrderItem
        v-for="order in orders"
        :key="order.id"
        :data="order"
      />
    </div>
  </PageContainer>
</template>
