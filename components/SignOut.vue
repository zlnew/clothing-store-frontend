<script setup lang="ts">
const toast = useToast()
const { logout } = useAuth()

const { submit } = useSubmit(
  () => logout(), {
    onSuccess: () => toast.add({ title: 'Logout Successful' })
  }
)
</script>

<template>
  <div>
    <UButton
      block
      label="Sign Out"
      color="black"
      size="lg"
      class="uppercase"
      @click="submit"
    />
  </div>
</template>
