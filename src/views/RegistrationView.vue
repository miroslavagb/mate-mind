<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full mx-4 sm:mx-6 lg:mx-8">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            v-model="name" 
            type="text" 
            id="name" 
            placeholder="Name" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
        </div>
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
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm Password" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
        </div>
        <button 
          type="submit" 
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  try {
    const response = await axios.postForm('http://127.0.0.1:5000/registration', {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });
    alert(response.data.message);
    // Redirect or other when sucess reg
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('An error occurred while registering. Please try again later.');
    }
  }
};
</script>
