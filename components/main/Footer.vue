<template>
  <footer class="border-t border-black">
    <UContainer>
      <div class="py-4 grid md:grid-cols-3 items-center gap-4">
        <div class="space-y-2">
          <p class="text-2xl font-bold">Zee Apparel</p>
          <div>
            <p>info@zeeapparel.com</p>
            <p>Tel: 123-456-789</p>
          </div>
        </div>

        <hr class="md:hidden border-black">

        <div class="md:col-span-2 grid grid-cols-2 md:grid-cols-3 justify-evenly gap-4">
          <div class="space-y-2">
            <h4 class="text-lg">Shop</h4>
            <ul>
              <li><NuxtLink to="/shop/all">All</NuxtLink></li>
              <li><NuxtLink to="/shop/men">Men</NuxtLink></li>
              <li><NuxtLink to="/shop/women">Women</NuxtLink></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="text-lg">Our Store</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Subscribe</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="text-lg">Terms & Conditions</h4>
            <ul>
              <li><a href="#">Store Policy</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Payment Methods</a></li>
            </ul>
          </div>
        </div>
      </div>
    </UContainer>

    <hr class="border-black">

    <UContainer>
      <div class="p-4 text-center">
        <p>© {{ new Date().getFullYear() }} by <a href="/">Zee Apparel.</a> All rights reserved</p>
      </div>
    </UContainer>
  </footer>
</template>
