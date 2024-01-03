<script setup lang="ts">
import SignInModal from './modals/SignInModal.vue'

const emit = defineEmits(['modalOpen'])

const { open } = useModal()

function openSignInModal () {
  open({
    title: 'Sign In to Zee Apparel',
    component: SignInModal,
  })
  emit('modalOpen')
}
</script>

<template>
  <div>
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
