<template>
  <div class="w-3/5 p-6 bg-[#00003A] bg-opacity-50 text-white rounded h-full flex flex-col justify-between relative">
    <div class="conversation-container relative z-10 overflow-auto p-8" style="height: 500px;">
      <ChatBox v-for="message in conversation" :key="message.id" :position="message.position" :message="message" />
    </div>
    <div class="flex items-center">
      <input
        type="text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        class="mt-2 p-5 w-3/4 bg-gray-700 rounded-l-lg border-none focus:outline-none"
        placeholder="Type your message here..."
      />
      <button @click="sendMessage" class="mt-2 p-5  bg-gray-700 text-white hover:bg-gray-800 focus:outline-none rounded-r-lg">
        <i class="far fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ChatBox from "@/components/Robot/Chatbox.vue";

export default {
  data() {
    return {
      userInput: "",
      conversation: [],
    };
  },
  methods: {
    sendMessage() {
      const response = {
        id: Date.now(),
        text: "I'm just a placeholder answer!",
        position: "end",
      };

      const userMessage = {
        id: Date.now(),
        text: this.userInput,
        position: "start",
      };

      this.conversation.push(userMessage, response);
      this.userInput = "";
    },
  },
  components: {
    ChatBox,
  },
};
</script>

<style scoped>
/* Component-specific styles here */
.conversation-container {
  max-height: 80%; /* Adjust as needed */
}

/* Add styles as needed for the ChatBox component */
</style>
