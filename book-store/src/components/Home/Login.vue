<template>
  <div class="h-screen w-screen flex items-center gap-8 bg-light">
    <div class="w-3/5 h-full bg-black mx-auto">
      <img
        class="w-full h-full object-cover"
        src="../../assets/reading.jpg"
        alt="login image"
      />
    </div>

    <div class="w-3/5 h-4/5 mx-auto flex flex-col">
      <form class="w-6/12 mx-auto shadow-lg p-8 rounded-lg bg-brown">
        <h2 class="font-bold text-center my-16 text-2xl">Login</h2>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            placeholder="name@gmail.com"
            required=""
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            required=""
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="text-white bg-dark hover:bg-light hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
          >
            Submit
          </button>
        </div>
      </form>
      <div class="flex w-6/12 mx-auto mt-10">
        <p>Dont have an account?</p>
        <button class="ml-8">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
