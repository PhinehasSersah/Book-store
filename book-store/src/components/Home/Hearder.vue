<template>
  <nav class="bg-brown h-[12vh] px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <RouterLink to="/" class="flex items-center">
        <div class="w-16 h-16 rounded-full mr-4">
          <img
            src="../../assets/books-store.png"
            class="w-full h-full rounded-full"
            alt="store logo"
          />
        </div>
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >The Buks</span
        >
      </RouterLink>

      <div class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <RouterLink
              to="/"
              class="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-dark md:p-0 dark:text-white"
              aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/signup"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-brown md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Account</RouterLink
            >
          </li>
          <li v-if="admin">
            <router-link
              to="/admin"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-brown md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Admin
            </router-link>
          </li>
          <li>
            <RouterLink
              to="/cart"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-brown md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Cart</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/orders"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-brown md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Orders</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const admin  = localStorage.getItem("admin")
const search = ref("");
function handleSearch() {
  console.log(search);
}
</script>
