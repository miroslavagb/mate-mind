<template>
  <div>
    <input
      v-model="questionTheme"
      :disabled="!book"
      placeholder="Enter theme for questions"
      class="input"
    />
    <textarea
      v-model="additionalPrompt"
      :disabled="!book"
      placeholder="Additional instructions"
      class="textarea"
    ></textarea>
    <button @click="generateQuestions" :disabled="!book" class="button">Generate Questions</button>
    <div v-if="generatedQuestions.length" class="questions-list">
      <div v-for="question in generatedQuestions" :key="question.id" class="question">
        <h4>{{ question.title }}</h4>
        <ul>
          <li v-for="option in question.options" :key="option.id">
            {{ option.key }}: {{ option.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    book: {
      type: Object,
      required: false, 
    },
  },
  data() {
    return {
      questionTheme: "",
      additionalPrompt: "",
      generatedQuestions: [],
    };
  },
  methods: {
      async generateQuestions() {
        const questionCount = 2; // Number of questions to generate
        if (!this.book) return; 
        
        try {
          const response = await axios.post(
            `http://127.0.0.1:5000/generate/${questionCount}`,
            {
              file_ids: [this.book.id], 
              prompt: this.additionalPrompt,
              theme: this.questionTheme,
            },
            {
              headers: {
                "Content-Type": "application/json",
              }
            }
          );
          this.generatedQuestions = response.data.data.questions;
        } catch (error) {
          console.error("Failed to generate questions:", error);
          alert("Failed to generate questions. Please try again.");
        }
      },
  },
   };
</script>

  
  <style scoped>
  .input,
  .textarea,
  .button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #000000;
  }
  
  .questions-list {
    margin-top: 20px;
  }
  
  .question {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #000000;
    border-radius: 5px;
    background-color: #000000;
  }

  
  </style>
  