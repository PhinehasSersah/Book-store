<template>
  <div class="py-4">
    <div class="flex justify-between w-full px-8 h-36 py-1">
      <div class="w-60 h-full">
        <img
          class="object-cover w-full h-full rounded-t-lg"
          :src="props.picture"
          alt="cart item image"
        />
      </div>
      <div class="flex flex-col px-4 leading-normal">
        <h5 class="text-xl font-bold tracking-tight text-dark dark:text-white">
          {{ props.title }}
        </h5>
        <p class="font-normal text-dark dark:text-gray-400 truncate">
          {{ props.description }}
        </p>
        <div class="mt-6 flex justify-between w-full">
          <div class="inline-flex rounded-md shadow-sm border-2">
            <button
              @click="decrement()"
              type="button"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              -
            </button>
            <p class="w-8 font-bold text-center mt-1">{{ quantity }}</p>
            <button
              @click="increment()"
              type="button"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-md border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <button class="text-red-600">
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
        </button>
      </div>
    </div>
    <hr class="my-1 h-px bg-dark border-0 dark:bg-gray-700" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const quantity = ref(1);

const decrement = () => {
  if (quantity.value === 1) {
    return;
  }
  quantity.value--;
};
const increment = () => {
  quantity.value++;
};
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
</script>
