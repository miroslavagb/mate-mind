<template>
  <div class="logout-container">
    <button @click="logoutUser" :disabled="logoutClicked">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';

const logoutClicked = ref(false);
const router = useRouter();
const userStore = useUserStore();

const logoutUser = async () => {
  if (logoutClicked.value) return; // Prevent mltpl clicks
  logoutClicked.value = true; // Disable the button
  try {
    const response = await axios.postForm('http://127.0.0.1:5000/logout');
    alert(response.data.message);
    if (response.status === 200) {
    userStore.clearUser(); // Clear user from store
    router.push('/login'); // Redirect to login page
  }
  } catch (error) {
    alert('An error occurred while logging out');
  } finally {
    logoutClicked.value = false; // Re-enable the button
  }
};
</script>


