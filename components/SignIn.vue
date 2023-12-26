<script setup lang="ts">
import SignInModal from './modals/SignInModal.vue'

const { open } = useModalStore()

function openSignInModal () {
  open({
    title: 'Sign In to Zee Apparel',
    component: SignInModal,
    componentProps: {
      refUrl: window.location.href
    }
  })
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
