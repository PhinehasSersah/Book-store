<template>
  <div>
    <form class="w-3/5 mx-auto shadow-lg shadow-brown rounded-lg p-12 my-16">
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
          v-model="editBookData.title"
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
          v-model="editBookData.quantity"
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
          v-model="editBookData.price"
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
          required
          @change="handleEditImageChange($event)"
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
          v-model="editBookData.description"
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
</template>

<script setup>
import { ref, reactive } from "vue";

// Editing books

const editBookData = reactive({
  title: "",
  quantity: "",
  price: "",
  description: "",
});
const editPictureData = ref();
const handleEditImageChange = ($event) => {
  let target = $event.target;
  if (target && target.files) {
    editPictureData.value = target.files[0];
  }
};
</script>
