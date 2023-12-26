<template>
  <nav class="py-4 md:py-0 border-b border-black">
    <UContainer class="grid grid-cols-3 items-center gap-4">
      <div class="col-span-2 md:col-span-1 p-2 w-fit border border-black bg-yellow-300">
        <NuxtLink to="/">
          <h1 class="text-2xl font-normal">Zee Apparel</h1>
        </NuxtLink>
      </div>

      <div class="hidden md:block">
        <ul class="uppercase flex items-center justify-center">
          <li>
            <NuxtLink to="/shop/all" exact-active-class="bg-yellow-300" class="p-6 block transition-colors hover:text-black hover:bg-yellow-300">
              All
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shop/men" exact-active-class="bg-yellow-300" class="p-6 block transition-colors hover:text-black hover:bg-yellow-300">
              Men
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/shop/women" exact-active-class="bg-yellow-300" class="p-6 block transition-colors hover:text-black hover:bg-yellow-300">
              Women
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex gap-4 justify-end items-center">
        <ShoppingCart />
        <HamburgerMenu />
      </div>
    </UContainer>
  </nav>
</template>
