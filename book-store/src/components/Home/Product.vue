<template>
  <div>
    <div class="w-96 mx-auto my-20">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm t font-medium text-gray-900 sr-only dark:text-gray-300"
          >Search</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-dark focus:border-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            placeholder="Search favorite books ..."
            required
            v-model="search"
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-dark hover:bg-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
          >
            Search
          </button>
        </div>
      </form>
    </div>
    <div class="relative">
      <div
        class="w-10/12 mx-auto flex flex-wrap gap-10 justify-center"
        v-if="!loading && allBooks && allBooks.length"
      >
        <div v-for="(item, index) in allBooks" :key="index">
          <ProductCard
            :title="item.title"
            :description="item.description"
            :picture="item.picture"
            :price="item.price"
            :id="item._id"
            :quantity="item.quantity"
            :addToCart="addToCart"
          />
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
</template>

<script setup>
import ProductCard from "./ProductCard.vue";
import { watch, ref, onMounted } from "vue";
import axiosConfig from "../../utils/axioxConfig";

// getting all books
const allBooks = ref();
const loading = ref(true);
const error = ref(null);
const getAllBooks = async () => {
  try {
    loading.value = true;
    const response = await axiosConfig.get(`books?q=${search.value}`);
    allBooks.value = response.data.books;
    loading.value = false;
  } catch (err) {
    error.value = err;
    throw err;
  }
};
onMounted(() => getAllBooks());
// search functionality
const search = ref("");
watch(search, () => getAllBooks());

// add  to cart
const errorMessage = ref("");
const successMessage = ref("");
const loggedIn = localStorage.getItem("loggedIn");
const token = localStorage.getItem("token");
const addToCart = async (bookID, quantity) => {
  if (!loggedIn) {
    errorMessage.value = "Login or sign up before";
    return;
  }
  let formData = new FormData();
  formData.append("bookID", bookID);
  formData.append("quantity", quantity);
  try {
    const response = await axiosConfig.post("cart", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    successMessage.value = response.data.msg;
  } catch (error) {
    throw error;
  }
};
</script>
