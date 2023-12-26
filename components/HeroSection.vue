<template>
  <UContainer
    :ui="{
      padding: 'px-0 sm:px-0 lg:px-0',
      constrained: 'max-w-full'
    }"
  >
    <div class="grid grid-cols-7 border-separate">
      <RouterLink to="/shop/men" tag="div" class="col-span-2 group relative">
        <img
          src="/img/category/men.jpg"
          alt="Men Category"
          width="1000"
          height="1000"
          class="object-cover w-full h-full"
        >
        <div class="absolute inset-0 transition-opacity flex justify-center items-center bg-gradient-to-b from-10% to-90% from-transparent via-yellow-300 to-transparent opacity-0 group-hover:opacity-70">
          <div class="hidden group-hover:block text-base font-light tracking-widest md:text-2xl lg:text-4xl">
            MEN
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/shop/all" tag="div" class="col-span-3 group relative">
        <img
          src="/img/category/all.jpg"
          alt="All Category"
          width="1000"
          height="1000"
          class="object-cover w-full h-full"
        >
        <div class="absolute inset-0 transition-opacity flex justify-center items-center bg-gradient-to-b from-10% to-90% from-transparent via-yellow-300 to-transparent opacity-0 group-hover:opacity-70">
          <div class="hidden group-hover:block text-base font-light tracking-widest md:text-2xl lg:text-4xl">
            ALL
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/shop/women" tag="div" class="col-span-2 group relative">
        <img
          src="/img/category/women.jpg"
          alt="Women Category"
          width="1000"
          height="1000"
          class="object-cover w-full h-full"
        >
        <div class="absolute inset-0 transition-opacity flex justify-center items-center bg-gradient-to-b from-10% to-90% from-transparent via-yellow-300 to-transparent opacity-0 group-hover:opacity-70">
          <div class="hidden group-hover:block text-base font-light tracking-widest md:text-2xl lg:text-4xl">
            WOMEN
          </div>
        </div>
      </RouterLink>
    </div>
  </UContainer>
</template>
