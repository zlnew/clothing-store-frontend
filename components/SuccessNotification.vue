<script setup lang="ts">
defineProps<{ message: string | null }>()
defineEmits(['close'])
</script>

<template>
  <UNotification
    v-if="message"
    id="success-notification"
    icon="i-mdi-check-circle"
    :title="message"
    :timeout="0"
    @close="$emit('close')"
  />
</template>
