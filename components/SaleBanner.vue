<script setup lang="ts">
const { getActive } = usePromo()

const { data: promo } = useAsyncData(
  'activePromo', () => getActive()
)
</script>

<template>
  <UContainer v-if="!!promo" :ui="{ padding: 'px-0 sm:px-0 lg:px-0', constrained: 'max-w-full'}">
    <div class="h-96 md:h-[28rem] flex flex-col justify-center items-center tracking-wide bg-gradient-to-b from-white via-yellow-300 to-white">
      <span class="text-lg md:text-xl uppercase">
        {{ promo.name }} IS ON!
      </span>
      <span class="text-7xl md:text-9xl font-light tracking-widest">
        {{ promo.discount_percentage }}% OFF
      </span>
      <span class="md:text-lg">
        {{ promo.discount_percentage }}% off sitewide using {{ promo.code.toUpperCase() }} at checkout
      </span>
    </div>
  </UContainer>
</template>
