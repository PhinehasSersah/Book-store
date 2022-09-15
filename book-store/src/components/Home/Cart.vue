<template>
  <div class="w-full h-screen bg-light">
    <h3 class="text-center text-2xl p-4 text-dark">Cart</h3>
    <div class="overflow-y-auto w-10/12 h-4/5 mx-auto grid place-items-center">
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
    <div class="w-2/5 mx-auto flex justify-between my-6">
      <p class="font-bold">
        Total Price <span>GHC {{ 300 }}</span>
      </p>
      <button
        type="button"
        class="inline-flex font-bold items-center py-2 px-4 text-sm  text-gray-900 bg-transparent rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        Checkout
        <svg
          aria-hidden="true"
          class="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import CartItem from "./CartItem.vue";
</script>
