<script setup lang="ts">
const categoryHeroes = [
  { name: 'Men', src: '/img/category/men.jpg', to: '/shop/men' },
  { name: 'All', src: '/img/category/all.jpg', to: '/shop/all' },
  { name: 'Women', src: '/img/category/women.jpg', to: '/shop/women' },
]
</script>

<template>
  <UContainer :ui="{ padding: 'px-0 sm:px-0 lg:px-0', constrained: 'max-w-full' }">
    <div class="grid grid-cols-7 border-separate">
      <NuxtLink
        v-for="({ name, src, to }, index) in categoryHeroes"
        :key="name"
        :to="to"
        tag="div"
        :class="index === 1 ? 'col-span-3' : 'col-span-2'"
        class="group relative"
      >
        <img
          :src="src"
          :alt="`${name} Category`"
          width="1000"
          height="1000"
          class="object-cover w-full h-full"
        >
        <div class="absolute inset-0 transition-opacity flex justify-center items-center bg-gradient-to-b from-10% to-90% from-transparent via-yellow-300 to-transparent opacity-0 group-hover:opacity-70">
          <div class="hidden group-hover:block uppercase text-base font-light tracking-widest md:text-2xl lg:text-4xl">
            {{ name }}
          </div>
        </div>
      </NuxtLink >
    </div>
  </UContainer>
</template>
