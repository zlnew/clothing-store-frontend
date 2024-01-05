<script setup lang="ts">
import SignInModal from './modals/SignInModal.vue'

const emit = defineEmits(['signIn'])

const modal = useModal()
const { user } = useAuth()

function openSignInModal () {
  emit('signIn')
  modal.open({
    title: 'Sign In to Zee Apparel',
    component: SignInModal
  })
}
</script>

<template>
  <div v-if="!user">
    <UButton
      block
      label="Sign In"
      color="black"
      variant="outline"
      size="lg"
      class="uppercase"
      @click="openSignInModal"
    />
  </div>
</template>
