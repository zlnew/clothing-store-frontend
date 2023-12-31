<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Zee Apparel'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="yellow" :height="1" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
      <ModalLayout />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
