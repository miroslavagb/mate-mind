<template>
  <div class="chat-container">
    <div class="messages">
      <div 
        v-for="response in responses" 
        :key="response.id" 
        class="message" 
        :class="{'user': response.user, 'response': !response.user}"
      >
        {{ response.text }}
      </div>
    </div>
    <div class="input-area">
      <input 
        type="text" 
        v-model="message" 
        :disabled="!book" 
        placeholder="How can I help you with your studies?" 
        class="input-field" 
        @keyup.enter="sendMessage"
      >
      <button 
        @click="sendMessage" 
        :disabled="!book" 
        class="button"
      >
        Send
      </button>
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
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: '',
      responses: [],
    };
  },
  watch: {
    clear(newValue) {
      if (newValue) {
        this.responses = [];
        this.saveConversation();  // Save the empty conversation
        this.$emit('clear-updated');
      }
    },
    book(newValue) {
      if (newValue) {
        this.loadConversation();  // Load conversation when a new book is selected
      }
    }
  },
  methods: {
    sendMessage() {
      const trimmedMessage = this.message.trim();
      if (!trimmedMessage || !this.book) return;
      
      this.responses.push({ id: Date.now(), text: trimmedMessage, user: true });
      this.message = '';
      this.saveConversation();  
      this.processMessage(trimmedMessage);
    },
    processMessage(message) {
      const questionWords = ["how", "what", "where", "who", "which", "when", "why", "whose" , "is", "are "];
      const lowercasedMessage = message.toLowerCase();
      
      const isQuestion = questionWords.some(word => lowercasedMessage.includes(word));

      if (isQuestion) {
        this.askQuestion(message);
      } else {
        this.responses.push({ id: Date.now(), text: "I'm not sure how to help with that.", user: false });
        this.saveConversation();  
      }
    },
    async askQuestion(question) {
      const token = localStorage.getItem('token'); 
      if (!this.book || !this.book.open_ai_id) {
        this.responses.push({ id: Date.now(), text: "Please upload a book first to ask questions related to it.", user: false });
        this.saveConversation(); 
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
        this.saveConversation();  // Save the conversation
      } catch (error) {
        console.error("Failed to get an answer:", error);
        this.responses.push({ id: Date.now(), text: "Error getting an answer. Please try again.", user: false });
        this.saveConversation();  
      }
    },
    saveConversation() {
      if (this.book && this.book.id) {
        localStorage.setItem(`conversation_${this.book.id}`, JSON.stringify(this.responses));
      }
    },
    loadConversation() {
      if (this.book && this.book.id) {
        const savedConversation = localStorage.getItem(`conversation_${this.book.id}`);
        this.responses = savedConversation ? JSON.parse(savedConversation) : [];
      }
    }
  },
  mounted() {
    this.loadConversation();  
  }
};
</script>



<style> 

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
  max-width: 70%; 
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 20px;
  color: #ffffff;
  position: relative;
  font-size: 14px;
  word-wrap: break-word; 
}

.user {
  background-color: #357ABD;
  align-self: flex-end; 
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-left: auto;
  text-align: left; 
}

.user:before {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent #357ABD;
}

.response {
  background-color: #3B3E4E;
  align-self: flex-start; 
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-right: auto;
  text-align: left; 
}

.response:before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  border-width: 10px 10px 10px 0;
  border-style: solid;
  border-color: transparent #3B3E4E transparent transparent;
}

.input-area {
  display: flex;
  padding: 10px;
  background-color: #2A2D3E;
  position: sticky;
  bottom: 0;
  width: 100%;
}

.input-field {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #357ABD;
  background-color: #2A2D3E;
  color: #fff;
}

.button {
  padding: 10px 20px;
  background-color: #4A90E2;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #357ABD;
}


</style>