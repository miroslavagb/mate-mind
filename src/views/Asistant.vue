<template>
  <div v-if="isAuthenticated" class="assistant-container">
    <aside class="file-upload-area">
      <book-upload @book-uploaded="handleBookUploaded"></book-upload>
      <ul v-if="uploadedFiles.length">
        <li 
          v-for="file in uploadedFiles" 
          :key="file.id" 
          @click="selectBook(file)"
          :class="{ 'active': currentBook && currentBook.id === file.id }"
        >
          {{ file.name || 'Untitled Book' }}
        </li>
      </ul>
    </aside>
    <section class="conversation-area">
      <!-- Use key to force remounting of chat-box and question-generator components -->
      <chat-box :key="currentBook?.id" :book="currentBook" :disabled="!bookUploaded"></chat-box>
      <question-generator :key="currentBook?.id" :disabled="!bookUploaded" :book="currentBook"></question-generator>
    </section>
  </div>
  <div v-else>
    <p>You must be logged in to view this page.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuth } from '@/components/Auth/useAuth.js';
import BookUpload from '@/components/Assistant/BookUpload.vue';
import ChatBox from '@/components/Assistant/ChatBox.vue';
import QuestionGenerator from '@/components/Assistant/QuestGenerator.vue';

const { isAuthenticated } = useAuth();
const router = useRouter();
const bookUploaded = ref(false);
const currentBook = ref(null);
const uploadedFiles = ref([]);

const fetchUploadedFiles = async () => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.get('http://127.0.0.1:5000/files', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    uploadedFiles.value = response.data.files;
    if (uploadedFiles.value.length && !currentBook.value) {
      selectBook(uploadedFiles.value[0]);  
    }
  } catch (error) {
    console.error("Failed to fetch uploaded files:", error);
  }
};

const handleBookUploaded = async (book) => {
  const token = localStorage.getItem('token'); 
  const fileExists = uploadedFiles.value.some(file => file.id === book.id);
  if (!fileExists) {
    uploadedFiles.value.push(book);  // Only add if it doesn't exist
  }
  
  try {
    const response = await axios.get('http://127.0.0.1:5000/files', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    uploadedFiles.value = response.data.files;
    selectBook(book); 
  } catch (error) {
    console.error("Failed to synchronize uploaded files:", error);
  }
};

const selectBook = (book) => {
  currentBook.value = null; 
  setTimeout(() => { 
    currentBook.value = book;
    bookUploaded.value = true;
  }, 0);
};

watch(isAuthenticated, (newVal) => {
  if (!newVal) {
    router.push('/login');
  }
});

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
  } else {
    fetchUploadedFiles();
  }
});
</script>

<style>
.assistant-container {
  display: flex;
  height: 90vh;
  background: #282c34; 
  overflow: hidden;
}

.file-upload-area {
  width: 300px;
  padding: 20px;
  background: #2E325A; 
  color: #FFF;
  border-right: 1px solid #414561; 
}

.file-upload-area ul {
  list-style-type: none;
  padding: 0;
}

.file-upload-area li {
  padding: 10px;
  background: #000000;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.file-upload-area li.active {
  background-color: #999; 
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
