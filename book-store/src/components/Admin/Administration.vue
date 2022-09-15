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
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
              placeholder="Harry Porter"
              required
              v-model="createBookData.title"
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
              v-model="createBookData.quantity"
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
              v-model="createBookData.price"
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
              required
              v-on:change="handleImageChange($event)"
              accept="image/*"
              capture
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
              v-model="createBookData.description"
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
          <EditBook />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hearder from "../Home/Hearder.vue";
import { reactive, ref } from "vue";
import EditBook from "./EditBook.vue";

// create books
const createBookData = reactive({
  title: "",
  quantity: "",
  price: "",
  description: "",
});
const pictureData = ref();
const handleImageChange = ($event) => {
  let target = $event.target;
  if (target && target.files) {
    pictureData.value = target.files[0];
  }
};
</script>
