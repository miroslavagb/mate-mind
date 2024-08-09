<template>
  <div>
    <input
      v-model="question"
      placeholder="Ask a question about the book..."
      @keyup.enter="askQuestion"
    />
    <button @click="askQuestion">Ask</button>
    <div v-for="response in responses" :key="response.id" class="response">
      {{ response.text }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      question: "",
      responses: [],
      userId: null, // store current user 
    };
  },
  mounted() {
    // Retrieve the user ID from local storage or wherever its stored
    this.userId = localStorage.getItem("userId"); 
  },
  methods: {
    async askQuestion() {
      if (!this.question || !this.book) return;

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/answer",
          { question: this.question }, // 
          {
            headers: {
              "Content-Type": "application/json", // set for JSON data
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
              "User-Id": this.userId, 
              "File-Id": this.book.id, //гet user& book id from db
            },
          }
        );

        this.responses.push({ text: response.data.data.content });
        this.question = "";
      } catch (error) {
        console.error("Failed to get an answer:", error);
        this.responses.push({ text: "Error getting an answer. Please try again." });
      }
    },
  },
};
</script>

<style scoped>
.response {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
