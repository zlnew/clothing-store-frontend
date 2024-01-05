<script setup lang="ts">
const { instance, state } = useModal()
</script>

<template>
  <UModal v-model="instance" :ui="{ rounded: 'rounded-none' }">
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
            @click="instance = false"
          />
        </div>
      </template>

      <Component :is="state.component" :="state.componentProps" />
    </UCard>
  </UModal>
</template>
