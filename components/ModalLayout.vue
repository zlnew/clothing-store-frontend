<script setup lang="ts">
const { state } = useModalStore()
const { modelValue } = storeToRefs(useModalStore())
</script>

<template>
  <UModal v-model="modelValue" :ui="{ rounded: 'rounded-none' }">
    <UCard
      :ui="{
        ring: '',
        rounded: 'rounded-none',
        divide: 'divide-y divide-black'
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-black">
            {{ state.title }}
          </h3>
          <UButton
            color="black"
            variant="outline"
            icon="i-mdi-close"
            @click="modelValue = false"
          />
        </div>
      </template>

      <Component :is="state.component" :="state.componentProps" />
    </UCard>
  </UModal>  
</template>