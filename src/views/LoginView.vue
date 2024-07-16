<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4 sm:mx-6 lg:mx-8">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :disabled="isSubmitting"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const router = useRouter();
const userStore = useUserStore();

const loginUser = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const response = await axios.postForm('http://127.0.0.1:5000/login', {
      email: email.value,
      password: password.value
    });
    alert(response.data.message);
    if (response.status === 200) {
    userStore.setUser(response.data); 
    router.push('/'); 
  }
  } catch (error) {
    alert(error.response.data.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

