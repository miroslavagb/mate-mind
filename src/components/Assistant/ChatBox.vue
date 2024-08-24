<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="response in responses" :key="response.id" class="message" :class="{'user': response.user}">
        {{ response.text }}
      </div>
    </div>
    <div class="input-area">
      <input type="text" v-model="message" :disabled="!book" placeholder="Ask a question or command..." class="input-field" @keyup.enter="sendMessage">
      <button @click="sendMessage" :disabled="!book" class="button">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    book: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      message: '',
      responses: [],
      userId: localStorage.getItem('userId'), 
    };
  },
  methods: {
    sendMessage() {
      const trimmedMessage = this.message.trim();
      if (!trimmedMessage || !this.book) return;
      
      this.responses.push({ id: Date.now(), text: trimmedMessage, user: true });
      this.message = '';
      this.processMessage(trimmedMessage);
    },
    processMessage(message) {
      if (message.toLowerCase().includes("how") || message.toLowerCase().includes("what")) {
        this.askQuestion(message);
      } else {
        this.responses.push({ id: Date.now(), text: "I'm not sure how to help with that.", user: false });
      }
    },
    async askQuestion(question) {
      const token = localStorage.getItem('token'); 
      if (!this.book || !this.book.open_ai_id) {
        this.responses.push({ id: Date.now(), text: "Please upload a book first to ask questions related to it.", user: false });
        return;
      }
      
      const headers = {
        Authorization: `Bearer ${token}`, 
        'File-ID': this.book.open_ai_id  
      };
      
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/answer",
          { question },
          { headers }
        );
        this.responses.push({ id: Date.now(), text: response.data.data.content, user: false });
      } catch (error) {
        console.error("Failed to get an answer:", error);
        this.responses.push({ id: Date.now(), text: "Error getting an answer. Please try again.", user: false });
      }
    },
  }
};
</script>





<style scoped>

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin: 5px 0;
  color: #fff;
}

.user {
  text-align: right;
}

.input-area {
  display: flex;
  padding: 10px;
}

.input-field {
  flex-grow: 1;
  margin-right: 10px;
}

.button {
  padding: 10px 20px;
  background-color: #4A90E2;
  border: none;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #357ABD;
}

.chat-area {
  max-height: 80vh;
  overflow-y: auto;
  background: linear-gradient(145deg, #252846, #1E2039);
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
</style>
