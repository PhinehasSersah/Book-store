<template>
  <div class="bg-light w-screen h-[120vh] relative">
    <Hearder />
    <h1 class="text-3xl py-6 text-center">Administration Dashboard</h1>

    <div class="w-96 h-16 mx-auto grid place-items-center">
      <button
      @click="viewOrder()"
        type="button"
        class="text-white bg-dark hover:bg-brown hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        View Orders
      </button>
    </div>
    <!-- view orders button -->

    <div
    v-if="showOrder"
      class="w-2/3 h-3/5 bg-white absolute left-1/2 -translate-x-1/2 top-60 z-20 rounded-lg shadow-md mx-auto overflow-y-auto"
    >
      <div class="overflow-x-auto relative">
        <!-- close  -->
        <button @click="hideOrder()" class="text-dark absolute right-4 top-3">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="py-3 px-6">Date</th>
              <th scope="col" class="py-3 px-6">Items</th>
              <!-- <th scope="col" class="py-3 px-6">Ordered by</th> -->
              <th scope="col" class="py-3 px-6">Total Price</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in orderData" :key="index">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ moment(item.createdAt).format("MMM Do YY") }}
              </th>
              <td class="py-4 px-6">{{ item.cartItems.length }}</td>
              <td class="py-4 px-6">GHC : {{ item.total_price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="w-full flex border-b-[1px] border-dark py-6">
      <div class="w-1/2 border-r-[1px] border-dark relative">
        <!-- success modal  -->
        <div
          v-if="pending"
          class="absolute left-1/2 -translate-x-1/2 rounded-md"
        >
          <p
            v-if="successMessage"
            class="text-green-500 bg-white font-semibold p-5 rounded-lg"
          >
            {{ successMessage }}
          </p>
          <p class="absolute top-14 right-1" v-else>
            <svg
              aria-hidden="true"
              class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </p>
        </div>
        <h3 class="text-center text-xl text-dark my-3">Add New Book</h3>

        <form
          @submit.prevent="createBook()"
          class="w-3/5 mx-auto shadow-md rounded p-4"
        >
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
              placeholder="Ex. Harry Porter"
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
              placeholder="Ex. 30"
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
              placeholder="Ex. 400"
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

      <!-- edditin books  -->
      <div class="w-1/2">
        <h3 class="text-center text-xl text-dark my-3">Edit Existing Books</h3>
        <div class="w-full h-[60vh] overflow-y-auto relative">
          <div v-if="!loading && allBooks && allBooks.length">
            <div v-for="(item, index) in allBooks" :key="index">
              <EditBook
                :title="item.title"
                :description="item.description"
                :picture="item.picture"
                :price="item.price"
                :id="item._id"
                :quantity="item.quantity"
              />
            </div>
          </div>
          <p class="absolute left-96 top-40" v-if="loading">
            <svg
              aria-hidden="true"
              class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-dark"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hearder from "../Home/Hearder.vue";
import { reactive, ref, onMounted } from "vue";
import EditBook from "./EditBook.vue";
import axiosConfig from "../../utils/axioxConfig";

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

// creating new books
const pending = ref(false);
const successMessage = ref("");
const createBook = async () => {
  if (
    !createBookData.title ||
    !createBookData.description ||
    !createBookData.price ||
    !createBookData.quantity ||
    !pictureData.value
  ) {
    return;
  }
  let formData = new FormData();
  formData.append("title", createBookData.title);
  formData.append("description", createBookData.description);
  formData.append("price", createBookData.price);
  formData.append("quantity", createBookData.quantity);
  formData.append("picture", pictureData.value);

  const token = localStorage.getItem("token");
  try {
    pending.value = true;
    const response = await axiosConfig.post("books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    successMessage.value = "New book created";
    createBookData.title = "";
    createBookData.description = "";
    (createBookData.price = ""), (createBookData.quantity = "");
    pictureData.value = "";

    setTimeout(() => {
      pending.value = false;
    }, 2000);
  } catch (error) {
    throw error;
  }
};

// getting all books
const allBooks = ref();
const loading = ref(true);
const error = ref(null);
const getAllBooks = async () => {
  try {
    loading.value = true;
    const response = await axiosConfig.get("books");
    allBooks.value = response.data.books;
    loading.value = false;
  } catch (err) {
    error.value = err;
    throw err;
  }
};
onMounted(() => getAllBooks());

// toggeling orders
const showOrder = ref(false);
const viewOrder = () => (showOrder.value = true);
const hideOrder = () => (showOrder.value = false);
</script>
