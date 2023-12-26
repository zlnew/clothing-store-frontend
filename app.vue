<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Zee Apparel'
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <ModalLayout />
    </NuxtLayout>
  
    <UNotifications />
  </div>
</template>
