<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4 sm:mx-6 lg:mx-8">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#2c235c]">Login</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
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

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const router = useRouter();

const loginUser = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const response = await axios.postForm('http://127.0.0.1:5000/login', {
      email: email.value,
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });
    if (response.data.access_token) {
      // JWT in local storage
      localStorage.setItem('token', response.data.access_token);
      alert('Login successful');
      // redirect to  home page or asistahnt?
      router.push('/');
    } else {
      alert('Login failed: ' + (response.data.message || 'Unknown error'));
    }
  } catch (error) {
    alert('Login error: ' + (error.response ? error.response.data.message : error.message));
  } finally {
    isSubmitting.value = false;
  }
};
</script>
