<template>
  <div class="h-screen w-screen flex items-center gap-8 bg-light">
    <div class="w-3/5 h-full mx-auto">
      <div class="w-full h-full">
        <img
          class="w-full h-full object-cover"
          src="../../assets/reading.jpg"
          alt="login image"
        />
      </div>
    </div>

    <div class="w-3/5 h-4/5 mx-auto flex flex-col">
      <form
        @submit.prevent="handleSingIn()"
        v-if="!showSignUp"
        class="w-6/12 mx-auto shadow-lg p-8 rounded-lg bg-brown"
      >
        <h2 class="font-bold text-center my-16 text-2xl">Login</h2>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your name</label
          >
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            placeholder="Enter your name"
            required
            v-model="loginData.name"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            required
            v-model="loginData.password"
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="text-white bg-dark hover:bg-light hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
          >
            Submit
          </button>
        </div>
      </form>

      <!-- sing up  -->
      <form
        @submit.prevent="handleSignUp()"
        v-else
        class="w-6/12 mx-auto shadow-lg p-8 rounded-lg bg-brown"
      >
        <h2 class="font-bold text-center my-16 text-2xl">Sign Up</h2>
        <div class="mb-6">
          <label
            for="sign-name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your name</label
          >
          <input
            type="text"
            id="sign-name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            placeholder="Enter your name"
            required
            v-model="signUpData.name"
          />
        </div>
        <div class="mb-6">
          <label
            for="sign-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your password</label
          >
          <input
            type="password"
            id="sign-password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            required
            v-model="signUpData.password"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Re-Enter password</label
          >
          <p class="text-red-600">
            {{ errorMessage }}
          </p>
          <input
            type="password"
            id="confirm-password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark focus:border-dark block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark dark:focus:border-dark"
            required
            v-model="signUpData.confirmPassword"
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="text-white bg-dark hover:bg-light hover:text-dark focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark"
          >
            Submit
          </button>
        </div>
      </form>
      <div class="flex w-6/12 mx-auto mt-10">
        <p>
          {{
            showSignUp ? "Already have an account? " : "Don't have an account?"
          }}
        </p>
        <button
          @click="toggle()"
          type="submit"
          class="ml-8 font-bold hover:translate-y-2 transition"
        >
          {{ showSignUp ? "Login" : "Sign Up" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import router from "../../router";
import axiosConfig from "../../utils/axioxConfig";
const showSignUp = ref(true);

const loginData = reactive({
  username: "",
  password: "",
});

const signUpData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});
const errorMessage = ref("");
watch(signUpData, () => {
  if (signUpData.password !== signUpData.confirmPassword) {
    errorMessage.value = "Passwords do not match";
  } else {
    errorMessage.value = "";
  }
});

const toggle = () => {
  showSignUp.value = !showSignUp.value;
};

// handleSignUP

const handleSignUp = async () => {
  if (!signUpData.username || !signUpData.password) {
    return (errorMessage.value = "Please enter username and password");
  }
  let formData = new FormData();
  formData.append("username", signUpData.username);
  formData.append("password", signUpData.password);

  try {
    await axiosConfig.post("auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    signUpData.username = "";
    signUpData.password = "";
    signUpData.confirmPassword = "";
    showSignUp.value = false
  } catch (error) {
    throw error;
  }
};
const handleSingIn = async () => {
  if (!loginData.username || !loginData.password) {
    return (errorMessage.value = "Please enter username and password");
  }
  let formData = new FormData();
  formData.append("username", loginData.username);
  formData.append("password", loginData.password);

  try {
    const response = await axiosConfig.post("auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("loggedIn", true);
    loginData.username = "";
    loginData.password = "";

    const userData = response?.data?.user;
    if (userData.username === "admin") {
      localStorage.setItem("admin", true);
      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } else {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  } catch (error) {
    throw error;
  }
};
</script>
