<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'My Profile' })

const breadcrumbLinks = [
  { label: 'Home', to: '/' },
  { label: 'My Profile' }
]

const route = useRoute()
const toast = useToast()

onMounted(() => {
  if (typeof route.query.verified === 'string' && route.query.verified) {
    toast.add({ title: 'Your email has been verified', color: 'green' })
  }
})
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
