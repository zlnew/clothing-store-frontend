<script setup lang="ts">
const { logout } = useAuth()

function handleLogout () {
  logout().then(() => window.location.reload())
}
</script>

<template>
  <div>
    <UButton
      block
      label="Sign Out"
      color="black"
      size="lg"
      class="uppercase"
      @click="handleLogout"
    />
  </div>
</template>
