<script setup lang="ts">
const props = defineProps<{
  data: Transaction
}>()

const toast = useToast()
const { storageBaseUrl } = useRuntimeConfig().public
const { update, refresh } = useTransaction()

const { submit: cancel, processing: cancelling } = useSubmit(
  () => handleCancel(), {
    onSuccess: async (result) => {
      await refresh()
      toast.add({
        title: result.message,
        color: 'green'
      })
    }
  }
)

async function handleCancel () {
  return update({
    orderId: props.data.order_id,
    action: 'cancel'
  })
}

function handlePayNow(snapURL: string) {
  window.open(snapURL)
}
</script>

<template>
  <div class="p-4 border border-black space-y-4">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm">{{ new Date(data.created_at).toDateString() }}</p>
      </div>
      <UBadge
        :label="data.status === 'settlement' ? 'On Proccess' : data.status"
        :color="data.status === 'settlement' || data.status === 'finished'
          ? 'green'
          : data.status === 'cancelled' || data.status === 'expired' || data.status === 'refunded'
          ? 'red'
          : 'gray'"
        size="xs"
        :ui="{ rounded: 'rounded-none' }"
        class="uppercase"
      />
    </div>

    <hr class="border-black">

    <div
      v-for="item in data.details"
      class="group relative grid grid-cols-7 md:grid-cols-8 items-start gap-4"
    >
      <img
        :src="`${storageBaseUrl}/${item.product.image}`"
        :alt="item.product.name"
        width="500"
        height="500"
      >
      <div class="col-span-6 space-y-2">
        <div>
          <NuxtLink :to="`/product/${item.product.category}/${item.product.slug}`">
            <h4 class="line-clamp-2">{{ item.product.name }} - {{ item.size }}</h4>
          </NuxtLink>
          <div class="flex gap-2">
            <p>{{ Rp(item.price / item.quantity) }} x {{ item.quantity }}</p>
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <p class="text-lg">{{ Rp((item.price / item.quantity) * item.quantity) }}</p>
      </div>
    </div>

    <hr class="border-black">

    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-xl">Total: {{ Rp(data.gross_amount) }}</p>
      </div>
      <div class="flex flex-wrap justify-end gap-2">
        <UButton
          v-if="['created', 'pending'].includes(data.status)"
          label="Cancel"
          color="black"
          variant="soft"
          size="lg"
          :loading="cancelling"
          @click="cancel"
        />
        <UButton
          v-if="['created', 'pending'].includes(data.status)"
          label="Pay now"
          color="yellow"
          size="lg"
          @click="handlePayNow(data.snap_url)"
        />
        <UButton
          label="Detail"
          color="black"
          variant="outline"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>