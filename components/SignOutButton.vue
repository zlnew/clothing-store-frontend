<script setup lang="ts">
const emit = defineEmits(['signOut'])

const toast = useToast()
const { user, logout } = useAuth()

const { submit } = useSubmit(
  () => logout(), {
    onSuccess: () => {
      emit('signOut')
      toast.add({ title: 'Logout Successful' })
    }
  }
)
</script>

<template>
  <div v-if="user">
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
