<template>
  <div>
    <div
      class="w-96 h-[75vh] bg-light rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="w-full h-3/5">
        <img
          class="w-full h-full rounded-t-lg object-cover"
          :src="props.picture"
          alt="books picture"
        />
      </div>

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-dark dark:text-white"
        >
          {{ props.title }}
        </h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ props.description }}
        </p>
      </div>
      <div class="flex px-5 justify-between py-3">
        <p>
          GHC: <span class="font-bold">{{ props.price }}</span>
        </p>
        <button
        @click="addToCart(props.id, 1)"
          type="button"
          class="text-white bg-dark hover:bg-brown hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-light dark:hover:bg-brown dark:focus:ring-dark"
        >
          Add to Cart
          <svg
            aria-hidden="true"
            class="ml-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  addToCart: {
    type: Function,
  },
});
</script>
