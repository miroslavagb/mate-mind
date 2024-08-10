<template>
  <div v-if="isAuthenticated" class="assistant-container">
    <aside class="file-upload-area">
      <book-upload @book-uploaded="handleBookUploaded"></book-upload>
      <ul v-if="bookUploaded">
        <li>{{ currentBook.name }}</li>
      </ul>
    </aside>
    <section class="conversation-area">
      <chat-box :book="currentBook"></chat-box>
      <question-generator v-if="bookUploaded" :book="currentBook"></question-generator>
    </section>
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
import QuestionGenerator from '@/components/Assistant/QuestGenerator.vue';

const { isAuthenticated } = useAuth();
const router = useRouter();
const bookUploaded = ref(false);
const currentBook = ref(null);

const handleBookUploaded = (book) => {
  currentBook.value = book;
  bookUploaded.value = true;
};

watch(isAuthenticated, (newVal) => {
  if (!newVal) {
    router.push('/login');
  }
});

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
  }
});
</script>


<style>
.assistant-container {
  display: flex;
  height: 100vh;
  background: #282c34; 
}

.file-upload-area {
  width: 300px;
  padding: 20px;
  background: #2E325A; 
  color: #FFF;
  border-right: 1px solid #414561; 
}

.conversation-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #1D2029; 
  color: white;
  padding: 20px;
}

.input, .textarea, .button {
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 5px;
  border: none;
  color: #333;
  background: #fff; 
}

.questions-list, .response {
  margin-top: 20px;
}

.question, .response {
  margin-top: 10px;
  padding: 10px;
  background: #333;
  border-radius: 5px;
  color: #fff;
}





</style>
