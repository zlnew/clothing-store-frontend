<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'My Profile' })

const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'My Profile' }
]
</script>

<template>
  <PageContainer constrained="max-w-xl" :breadcrumb-links="breadcrumbLinks">
    <div class="flex flex-col gap-4">
      <ProfileAccountForm />
      <hr class="border-dashed border-black">
      <ProfileCustomerDetailsForm />
    </div>
  </PageContainer>
</template>
