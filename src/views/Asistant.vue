<template>
  <div v-if="isAuthenticated" class="assistant-container"> 
    <div class="upload-area">
      <book-upload @book-uploaded="handleBookUploaded"></book-upload>
    </div>
    <div v-if="bookUploaded" class="chat-area">
      <chat-box :book="currentBook"></chat-box>
    </div>
  </div>
  <div v-else>
    <p>You must be logged in to view this page.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/components/Auth/useAuth.js';
import BookUpload from '@/components/Assistant/BookUpload.vue';
import ChatBox from '@/components/Assistant/ChatBox.vue';

const { isAuthenticated } = useAuth();
const router = useRouter();
const bookUploaded = ref(false);
const currentBook = ref(null);

const handleBookUploaded = (book) => {
  currentBook.value = book;
  bookUploaded.value = true;
};

// Watch for authentication changes
watch(isAuthenticated, (newVal) => {
  if (!newVal) {
    router.push('/login');
  }
});

// Initial redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
  }
});
</script>

<style>
.assistant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  background: #1D2029;
}

.upload-area, .chat-area {
  width: 90%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(145deg, #2E325A, #252846);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  color: #FFF;
}

.upload-area {
  border: 1px solid #414561;
}

.chat-area {
  background: linear-gradient(145deg, #252846, #1E2039);
}
</style>
