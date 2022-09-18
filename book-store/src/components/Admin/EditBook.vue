<template>
  <div class="relative">
    <p
      @click="handleDelete()"
      class="w-20 justify-between h-6 font-bold text-red-600 absolute right-44 top-4 flex cursor-pointer hover:scale-110 transition duration-200"
    >
      Delete
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
    </p>

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
          v-on:change="handleEditImageChange($event)"
          accept="image/*"
          capture
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
          @click="handleEdit()"
          type="submit"
          class="text-white bg-dark hover:bg-light hover:text-dark hover:border-2 hover:border-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
        >
          Confirm Edit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import router from "../../router";
import axiosConfig from "../../utils/axioxConfig";
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
  },
  id: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

// Editing books

const editBookData = reactive({
  title: props.title || "",
  quantity: props.quantity || "",
  price: props.price || "",
  description: props.description || "",
});
const editPictureData = ref();
const handleEditImageChange = ($event) => {
  let target = $event.target;
  if (target && target.files) {
    editPictureData.value = target.files[0];
  }
};

// edit book data function
const handleEdit = async () => {
  // if (
  //   !editBookData.title ||
  //   !editBookData.description ||
  //   !editBookData.price ||
  //   !editBookData.quantity ||
  //   !editPictureData.value
  // ) {
  //   return;
  // }
  let formData = new FormData();
  formData.append("title", editBookData.title);
  formData.append("description", editBookData.description);
  formData.append("price", editBookData.price);
  formData.append("quantity", editBookData.quantity);
  if (editPictureData.value === null || editPictureData.value === undefined) {
    formData.append("picture", props.picture);
  }else {
    formData.append("picture", editPictureData.value);
  }

  const token = localStorage.getItem("token");
  console.log(editPictureData.value)
  try {
    await axiosConfig.put(`books/${props.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

// deleting books
const handleDelete = async () => {
  const token = localStorage.getItem("token");
  try {
    alert("Comfirm Delete");
    await axiosConfig.delete(`books/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.go();
  } catch (error) {
    throw error;
  }
};
</script>
