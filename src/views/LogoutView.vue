<template>
  <div class="logout-container">
    <button @click="logoutUser" :disabled="logoutClicked">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const logoutClicked = ref(false); 

const logoutUser = async () => {
  if (logoutClicked.value) return; // Prevent multiple clicks
  logoutClicked.value = true; // Disable the button
  try {
    const response = await axios.postForm('http://127.0.0.1:5000/logout');
    alert(response.data.message);
  } catch (error) {
    alert('An error occurred while logging out');
  } finally {
    logoutClicked.value = false; // Re-enable the button
  }
};
</script>
