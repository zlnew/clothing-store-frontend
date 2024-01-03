<script setup lang="ts">
import type { BreadcrumbLink } from '@nuxt/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    constrained?: string
    breadcrumbLinks: BreadcrumbLink[]
  }>(), {
    constrained: 'max-w-4xl'
  }
)
</script>

<template>
  <UContainer :ui="{ constrained }">
    <div class="my-8 md:my-14">
      <div class="space-y-4">
        <UBreadcrumb :links="breadcrumbLinks" />
        <hr class="border-black">
        <slot />
      </div>
    </div>
  </UContainer>
</template>
