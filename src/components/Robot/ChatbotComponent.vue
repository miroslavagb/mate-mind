<template>
    <div class="space-y-4">
      <!-- Chat messages -->
      <div v-for="message in messages" :key="message.id" class="flex">
        <div v-if="message.type === 'user'" class="bg-blue-500 text-white p-2 rounded">
          {{ message.text }}
        </div>
        <div v-else class="bg-gray-300 p-2 rounded">
          {{ message.text }}
        </div>
      </div>
  
      <!-- User input -->
      <div class="flex">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message" class="flex-1 p-2 border rounded-l" />
        <button @click="sendMessage" class="bg-blue-500 text-white p-2 rounded-r">Send</button>
      </div> 
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInput: '',
        messages: [
          { id: 1, text: 'Hi there! How can I assist you today?', type: 'bot' },
        ],
      };
    },
    methods: {
      sendMessage() {
        if (this.userInput.trim() !== '') {
          this.messages.push({ id: this.messages.length + 1, text: this.userInput, type: 'user' });
          this.userInput = '';
          // Simulate bot response (replace with actual logic)
          this.messages.push({ id: this.messages.length + 1, text: 'Sure, I can help you with that!', type: 'bot' });
        }
      },
    },
  };
  </script>
  