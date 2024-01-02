<script setup lang="ts">
defineProps<{ message: string | null }>()
defineEmits(['close'])
</script>

<template>
  <UNotification
    v-if="message"
    id="error-notification"
    icon="i-mdi-alert-circle"
    color="red"
    :title="message"
    :timeout="0"
    @close="$emit('close')"
  />
</template>
