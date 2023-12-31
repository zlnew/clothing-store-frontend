<script setup lang="ts">
const auth = useAuthStore()
</script>

<template>
  <div>
    <UButton
      block
      label="Sign Out"
      color="black"
      size="lg"
      class="uppercase"
      @click="auth.signOut"
    />
  </div>
</template>
