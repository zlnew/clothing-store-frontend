<script setup lang="ts">
defineProps<{
  quantity: number
  stock: number
}>()

const emit = defineEmits(['update:quantity'])

const onUpdateValue = (value: number) => emit('update:quantity', value)
</script>

<template>
  <div class="max-w-16">
    <UInput
      type="number"
      size="xs"
      :model-value="quantity"
      :min="1"
      :max="stock"
      @update:model-value="onUpdateValue"
    />
  </div>
</template>
