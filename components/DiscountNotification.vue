<script setup lang="ts">
defineProps<{ message: string | null }>()
defineEmits(['close'])
</script>

<template>
  <UNotification
    v-if="message"
    id="discount-notification"
    icon="i-mdi-discount"
    color="gray"
    :title="message"
    :timeout="0"
    @close="$emit('close')"
  />
</template>
