<script setup lang="ts">
const { active } = useVoucherStore()

const { data: voucher } = useAsyncData(
  'active_voucher',
  () => active()
)
</script>

<template>
  <div v-if="voucher" class="p-2 text-center bg-black text-white">
    <UContainer>
      {{ voucher.name }} is on! {{ voucher.discount_percentage }}% off sitewide using {{ voucher.code.toUpperCase() }} at checkout
    </UContainer>
  </div>
</template>
