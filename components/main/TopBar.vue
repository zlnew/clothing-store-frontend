<script setup lang="ts">
const { getActive } = usePromo()

const { data: promo } = useAsyncData(
  'activePromo', () => getActive()
)
</script>

<template>
  <div v-if="!!promo" class="p-2 text-center bg-black text-white">
    <UContainer>
      {{ promo.name }} is on! {{ promo.discount_percentage }}% off sitewide using {{ promo.code.toUpperCase() }} at checkout
    </UContainer>
  </div>
</template>
