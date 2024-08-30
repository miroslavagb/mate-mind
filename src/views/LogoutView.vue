<template>
  <div class="logout-container">
    <button @click="logoutUser" :disabled="logoutClicked">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const logoutClicked = ref(false);
const router = useRouter();

const logoutUser = () => {
  if (logoutClicked.value) return; 
  logoutClicked.value = true; 
  try {
    localStorage.removeItem('token');
    router.push('/login');
    console.log('Logged out successfully');
  } catch (error) {
    console.log('An error occurred while logging out');
  } finally {
    logoutClicked.value = false; 
  }
};
</script>



