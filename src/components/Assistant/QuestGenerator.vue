<!-- combined quest generator & evaluator components -->

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
      <div v-for="(question, index) in generatedQuestions" :key="question.id" class="question">
        <h4>{{ question.title }}</h4>
        <ul>
          <li v-for="option in question.options" :key="option.id">
            {{ option.key }}: {{ option.value }}
          </li>
        </ul>
        <input v-model="userAnswers[index]" placeholder="Your answer (e.g., A, B, C)" class="answer-input">
      </div>
      <button @click="evaluateAnswers" :disabled="!generatedQuestions.length" class="button">Evaluate</button>
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
      userAnswers: [],
    };
  },
  methods: {
    async generateQuestions() {
      const token = localStorage.getItem('token'); 
      const headers = {
        Authorization: `Bearer ${token}` 
      };
      const questionCount = 2;  // Number of questions to generate
      if (!this.book) return;

      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/generate/${questionCount}`,
          {
            file_ids: [this.book.id],
            prompt: this.additionalPrompt,
            theme: this.questionTheme,
          },
          { headers }
        );
        this.generatedQuestions = response.data.data.questions;
        this.userAnswers = new Array(this.generatedQuestions.length).fill('');
      } catch (error) {
        console.error("Failed to generate questions:", error);
        alert("Failed to generate questions. Please try again.");
      }
    },
    async evaluateAnswers() {
      const token = localStorage.getItem('token'); 
      if (!this.book || !this.book.id) {
        alert("No book selected for evaluation.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`, 
        'File-ID': this.book.id  
      };

      try {
        const userAnswers = this.userAnswers.map((answer, index) => {
          const question = this.generatedQuestions[index];
          const selectedOption = question.options.find(option => option.key.toUpperCase() === answer.toUpperCase());
          return {
            question_id: question.id,
            option_id: selectedOption ? selectedOption.id : null
          };
        });

        if (userAnswers.some(answer => answer.option_id === null)) {
          alert("Please enter valid answers for all questions.");
          return;
        }

        const response = await axios.post(
          'http://127.0.0.1:5000/evaluate',
          { userAnswers },
          { headers }
        );
        alert('Evaluation complete. Check results!');  
      } catch (error) {
        console.error("Failed to evaluate answers:", error);
        alert("Failed to evaluate answers. Please try again.");
      }
    }
  }
};
</script>

<style scoped>
.input, .textarea, .button, .answer-input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #d5d3d3;
}

.questions-list {
  margin-top: 20px;
}

.question {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #000000;
}
</style>
