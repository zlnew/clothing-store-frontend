<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  validate: async (route) => {
    const statuses = ['active', 'cancelled', 'finished']
    return (typeof route.params.status === 'string')
      ? statuses.includes(route.params.status)
      : false
  }
})

useSeoMeta({
  title: 'My Order'
})

const route = useRoute()
const { all } = useTransactionStore()

async function getTransactions () {
  const status = route.params.status && typeof route.params.status === 'string'
    ? route.params.status
    : 'active'

  return all(status)
}

const { data: transactions, refresh, pending } = await useAsyncData(
  'transactions', () => getTransactions()
)
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-4xl' }" class="my-8 md:my-14">
    <div class="space-y-4">
      <UBreadcrumb
        divider="/"
        :links="[
          { label: 'Home', to: '/' },
          { label: 'My Order' }
        ]"
        :ui="{ active: 'text-black'}"
      />

      <hr class="border-black" />

      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <UButton
            to="/order/active"
            label="Active"
            :color="$route.path === '/order/active' ? 'yellow' : 'black'"
            :variant="$route.path === '/order/active' ? 'solid' : 'outline'"
          />
          <UButton
            to="/order/cancelled"
            label="Cancelled"
            :color="$route.path === '/order/cancelled' ? 'yellow' : 'black'"
            :variant="$route.path === '/order/cancelled' ? 'solid' : 'outline'"
          />
          <UButton
            to="/order/finished"
            label="Finished"
            :color="$route.path === '/order/finished' ? 'yellow' : 'black'"
            :variant="$route.path === '/order/finished' ? 'solid' : 'outline'"
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
      
      <div v-if="transactions">
        <div v-if="transactions.length < 1" class="h-96 flex justify-center items-center">
          <p>You don't have an order yet</p>
        </div>
        
        <div v-else class="min-h-96 flex flex-col gap-4">
          <OrderItem
            v-for="transaction in transactions"
            :key="transaction.id"
            :data="transaction"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
