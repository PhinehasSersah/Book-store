<template>
  <div class="bg-light w-screen h-screen">
    <Hearder />
    <h1 class="text-3xl py-6 text-center">Administration Dashboard</h1>
    <div class="w-full flex">
      <div class="w-1/2 border-r-[1px] border-dark">
        <h3 class="text-center text-xl text-dark my-3">Add New Book</h3>

        <form class="w-3/5 mx-auto shadow-md rounded p-4">
          <div class="mb-3">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Book Title</label
            >
            <input
              type="text"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              placeholder="Harry Porter"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Stock Quantity</label
            >
            <input
              type="number"
              id="quantity"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              placeholder="30"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Price</label
            >
            <input
              type="number"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              placeholder="400"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="image"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Picture</label
            >
            <input
              type="file"
              id="image"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              required=""
            />
          </div>
          <div class="mb-3">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Description</label
            >
            <textarea
              id="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              required
              placeholder="Describe the book"
            >
            </textarea>
          </div>

          <button
            type="submit"
            class="text-white bg-dark hover:bg-light hover:text-dark hover:border-2 hover:border-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="w-1/2">
        <h3 class="text-center text-xl text-dark my-3">Edit Existing Books</h3>
        <div class="w-full h-[60vh] overflow-y-auto">
          <form
            class="w-3/5 mx-auto shadow-lg shadow-brown rounded-lg p-12 my-16"
          >
            <div class="mb-2">
              <label
                for="title"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Book Title</label
              >
              <input
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
                placeholder="Harry Porter"
                required
              />
            </div>
            <div class="mb-2">
              <label
                for="quantity"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Stock Quantity</label
              >
              <input
                type="number"
                id="quantity"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
                placeholder="30"
                required
              />
            </div>
            <div class="mb-2">
              <label
                for="price"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Price</label
              >
              <input
                type="number"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
                placeholder="400"
                required
              />
            </div>
            <div class="mb-2">
              <label
                for="image"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Picture</label
              >
              <input
                type="file"
                id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
                required=""
              />
            </div>
            <div class="mb-2">
              <label
                for="description"
                class="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Description</label
              >
              <textarea
                id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
                required
                placeholder="Describe the book"
              >
              </textarea>
            </div>
            <div class="flex justify-between mt-4">
              <button
                type="submit"
                class="text-white bg-dark hover:bg-light hover:text-dark hover:border-2 hover:border-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
              >
                Submit
              </button>
              <p
                type="submit"
                class="text-white bg-red-600 hover:bg-light hover:text-red-600 hover:border-2 hover:border-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
              >
                Delete
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hearder from "../Home/Hearder.vue";
</script>
