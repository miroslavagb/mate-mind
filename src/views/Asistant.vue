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
      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'generator' }" 
          @click="switchTab('generator')">Question Generator</button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'evaluator' }" 
          @click="switchTab('evaluator')">Question Evaluator</button>
      </div>
      <div v-show="activeTab === 'generator'" class="chat-area">
        <chat-box :book="currentBook" :clear="clearChat" @clear-updated="resetClear"></chat-box>
      </div>
      <div v-show="activeTab === 'evaluator'" class="chat-area">
        <question-generator :book="currentBook" :clear="clearChat" @clear-updated="resetClear"></question-generator>
      </div>
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
const activeTab = ref('generator');

const clearChat = ref(false);

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
    uploadedFiles.value.push(book);  
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
  clearChat.value = true;
  currentBook.value = book;
};

const resetClear = () => {
  clearChat.value = false; 
};

const switchTab = (tab) => {
  activeTab.value = tab;
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
  transition: background-color 0.3s;
}

.file-upload-area li:hover {
  background-color: #444;
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
  padding: 0 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 15px;
}

.tab {
  padding: 20px 20px; 
  background: linear-gradient(145deg, #3b3e4e, #2a2d3e);
  border: none;
  color: white;
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  line-height: 0.5;
}

.tab:first-child {
  margin-left: 0;
}

.tab:last-child {
  margin-right: 0;
}

.tab:hover {
  background: linear-gradient(145deg, #383c53, #212437);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.tab.active {
  background: linear-gradient(145deg, #aa4ae2, #357abd);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
}

.tab.active:hover {
  background: linear-gradient(145deg, #4a90e2, #aa4ae2);
}

.tab:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 74, 226, 0.5);
}




.chat-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #2A2D3E;
  border-radius: 8px;
  overflow: hidden;
}

</style>