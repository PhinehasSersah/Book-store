<template>
  <div class="w-full h-[88vh] bg-light relative">
    <h3 class="text-center text-2xl p-4 text-dark">Cart</h3>
    <div
      v-if="!loading && allCartItems && allCartItems.length"
      class="overflow-y-auto w-10/12 h-4/5 mx-auto grid place-items-center"
    >
      <div class="w-8/12" v-for="(item, index) in allCartItems" :key="index">
        <CartItem
          :title="item?.bookID?.title"
          :description="item?.bookID?.description"
          :picture="item?.bookID?.picture"
          :price="item?.bookID?.price"
          :id="item?._id"
          :quantity="item?.bookID?.quantity"
          :handleDelete="handleDelete"
          :settingTotal="settingTotal"
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
    <div class="w-2/5 mx-auto flex justify-between my-5">
      <p class="font-bold text-xl">
        Total Price <span>GHC {{ totalItemPrice }}</span>
      </p>
      <div>
        <button
          @click="viewDelete()"
          class="inline-flex font-bold items-center py-2 px-4 text-sm text-red-600 bg-transparent rounded-lg border border-red-600 hover:bg-red-600 mr-8 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-600 focus:text-white"
        >
          Clear Cart
        </button>
        <button
          type="button"
          class="inline-flex font-bold items-center py-2 px-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          @click="viewOrder()"
        >
          Checkout
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <!-- confirm delete  -->

      <div
        v-if="showDelete"
        class="w-96 h-48 bg-white absolute bottom-28 left-1/2 -translate-x-1/2 rounded-lg shadow-lg"
      >
        <h3 class="text-center font-bold my-3">Confirm Clear Cart</h3>
        <div class="w-2/3 h-3/5 mx-auto my-2 flex justify-between">
          <button
            @click="clearCart()"
            class="h-10 w-28 font-bold items-center py-2 px-1 text-sm text-red-600 mt-10 bg-transparent rounded-lg border border-red-600 hover:bg-red-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-600 focus:text-white"
          >
            Confirm
          </button>
          <button
            @click="hideDelete()"
            class="h-10 w-28 font-bold items-center py-2 px-1 text-sm text-dark mt-10 bg-transparent rounded-lg border border-dark hover:bg-brown hover:text-white focus:z-10 focus:ring-2 focus:ring-dark focus:bg-dark focus:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
      <!-- order card  -->

      <div
        class="absolute top-36 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow dark:bg-gray-700 w-1/3 h-2/3"
        :class="{ hidden: !showOrder }"
      >
        <!-- Modal header -->
        <div class="p-4 rounded-t border-b relative">
          <h3
            class="text-xl text-center font-semibold text-gray-900 dark:text-white"
          >
            Confirm Purchase
          </h3>
          <button @click="hideOder()" class="text-dark absolute right-4 top-3">
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
        </div>
        <!-- Modal body -->
        <div class="h-96 w-96 mx-auto">
          <h4 class="text-center font-semibold my-2">Books Ordered</h4>

          <div class="w-full h-44 overflow-y-auto">
            <div
              class="w-full"
              v-for="(item, index) in allCartItems"
              :key="index"
            >
              <p class="border-2 my-2 w-full h-10 font-semibold p-1 rounded-sm">
                {{ item?.bookID?.title }}
              </p>
            </div>
          </div>
          <p class="text-center font-bold my-5">
            Total Price: GHC {{ totalItemPrice }}
          </p>

          <!-- Modal footer -->
          <div
            class="flex items-center justify-between p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="orderItems()"
              data-modal-toggle="defaultModal"
              type="button"
              class="text-white bg-dark hover:bg-brown hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartItem from "./CartItem.vue";
import { ref, onMounted } from "vue";
import axiosConfig from "../../utils/axioxConfig";
import router from "../../router";

// get cart Items
const allCartItems = ref();
const loading = ref(true);
const error = ref(null);
const token = localStorage.getItem("token");
const getAllCart = async () => {
  try {
    loading.value = true;
    const response = await axiosConfig.get("cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    allCartItems.value = response.data.cart;
    loading.value = false;
  } catch (err) {
    error.value = err;
    throw err;
  }
};
//  deleting items in cart

const deleteMesssage = ref("");
const handleDelete = async (id) => {
  try {
    const response = await axiosConfig.delete(`cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    deleteMesssage.value = response.data.msg;

    router.go();
  } catch (error) {
    throw error;
  }
};

// function to calculate total price
const totalItemPrice = ref(0);
const settingTotal = () => {
  const priceItem = document.querySelectorAll(".price");
  const priceArray = Array.from(priceItem);
  let itemArray = [];
  priceArray.forEach((item) => itemArray.push(Number(item.innerHTML)));
  totalItemPrice.value = itemArray.reduce((a, b) => a + b, 0);
};
onMounted(() => {
  getAllCart();
});

// clearing all cart items
const clearCart = async () => {
  try {
    loading.value = true;
    const response = await axiosConfig.delete("cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    loading.value = false;
    router.go();
    setTimeout(() => {
      hideDelete();
    }, 3000);
  } catch (err) {
    error.value = err;
    throw err;
  }
};
// toggeling orders
const showOrder = ref(false);
const hideOder = () => {
  showOrder.value = false;
};
const viewOrder = () => {
  showOrder.value = true;
};
// toggeling delete
const showDelete = ref(false);
const hideDelete = () => {
  showDelete.value = false;
};
const viewDelete = () => {
  showDelete.value = true;
};

// placing orders

const orderItems = async () => {
  if (!allCartItems.value.length) {
    return;
  }
  const priceItem = document.querySelectorAll(".price");
  const quantity = document.querySelectorAll(".quantity");
  const priceArray = Array.from(priceItem);
  const quantityArray = Array.from(quantity);
  let orders = [];
  for (let i = 0; i < priceArray.length; i++) {
    let orderItems = {
      bookID: "",
      price: 0,
      quantity: 0,
    };
    orderItems.bookID = allCartItems.value[i]?.bookID?._id;
    orderItems.price = Number(priceArray[i].innerHTML);
    orderItems.quantity = Number(quantityArray[i].innerHTML);
    orders.push(orderItems);
  }
  try {
    const response = await axiosConfig.post(
      "orders",
      {
        cartItems: orders,
        total_price: totalItemPrice.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTimeout(() => {
      hideOder();
    }, 3000);
  } catch (error) {
    throw error;
  }
};
</script>
