<template>
  <div class="w-screen h-[88vh] bg-light grid place-items-center">
    <div class="w-2/3 h-4/5 bg-white rounded-lg shadow-md">
      <h2 class="text-center font-semibold text-xl my-5 text-dark">
        Orders Placed
      </h2>

      <div class="w-2/3 h-4/5 rounded-lg shadow-md mx-auto overflow-y-auto">
        <div class="overflow-x-auto relative">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="py-3 px-6">Date</th>
                <th scope="col" class="py-3 px-6">Items</th>
                <th scope="col" class="py-3 px-6">Total Price</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in orderData" :key="index">
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
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
    </div>
  </div>
</template>

<script setup>
import axiosConfig from "../../utils/axioxConfig";
import { onMounted, ref } from "vue";
import moment from "moment";

// getting Order
const token = localStorage.getItem("token");
const orderData = ref();
const getOrders = async () => {
  try {
    const response = await axiosConfig.get("orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    orderData.value = response.data.orders;
  } catch (error) {
    throw error;
  }
};

onMounted(() => getOrders());
</script>
