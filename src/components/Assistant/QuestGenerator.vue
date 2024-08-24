<template>
  <div class="quiz-container">
    <div v-if="clear" class="quiz-reset">Quiz has been reset.</div>
    <div v-else class="scroll-container">
      <input
        v-model="questionTheme"
        :disabled="!book"
        placeholder="Enter theme for questions"
        class="input"
      />
      <input
        v-model.number="questionCount"
        type="number"
        min="1"
        placeholder="Number of questions"
        class="input"
        :disabled="!book"
      />
      <button @click="generateQuestions" :disabled="!book || generating" class="button">
        {{ generating ? "Generating..." : "Generate Questions" }}
      </button>

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
        <button @click="evaluateAnswers" :disabled="!generatedQuestions.length" class="button">
          Evaluate
        </button>
      </div>

      <div v-if="evaluationResult" class="evaluation-result">
        <h4>Evaluation Result</h4>
        <div v-html="formattedEvaluationResult"></div>
      </div>
    </div>

    <div class="fixed-bottom-container">
      <button @click="generateNewQuiz" class="button">Generate New Quiz</button>
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
    clear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      questionTheme: "",
      additionalPrompt: "",
      questionCount: "",
      generating: false,
      generatedQuestions: [],
      userAnswers: [],
      evaluationResult: null,
    };
  },
  watch: {
    clear(newValue) {
      if (newValue) {
        this.generatedQuestions = [];
        this.userAnswers = [];
        this.evaluationResult = null;
        this.questionTheme = "";
        this.$emit('clear-updated');  
      }
    }
  },
  computed: {
    formattedEvaluationResult() {
      if (this.evaluationResult && this.evaluationResult.content) {
        return this.evaluationResult.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
      }
      return '';
    },
  },
  methods: {
    async generateQuestions() {
      this.generating = true;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!this.book) return;

      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/generate/${this.questionCount}`,
          {
            file_ids: [this.book.open_ai_id],
            prompt: this.additionalPrompt,
            theme: this.questionTheme,
          },
          { headers }
        );
        this.generatedQuestions = response.data.data.questions;
        this.userAnswers = new Array(this.generatedQuestions.length).fill("");
        this.generating = false;
      } catch (error) {
        console.error("Failed to generate questions:", error);
        alert("Failed to generate questions. Please try again.");
        this.generating = false;
      }
    },
    async evaluateAnswers() {
      const token = localStorage.getItem("token");
      if (!this.book || !this.book.id) {
        alert("No book selected for evaluation.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "File-ID": this.book.open_ai_id,
      };

      try {
        const userAnswers = this.userAnswers.map((answer, index) => {
          const question = this.generatedQuestions[index];
          const selectedOption = question.options.find(
            (option) => option.key.toUpperCase() === answer.toUpperCase()
          );
          return {
            question_id: question.id,
            option_id: selectedOption ? selectedOption.id : null,
          };
        });

        if (userAnswers.some((answer) => answer.option_id === null)) {
          alert("Please enter valid answers for all questions.");
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:5000/evaluate",
          { userAnswers },
          { headers }
        );

        this.evaluationResult = response.data.evaluation_response;
      } catch (error) {
        console.error("Failed to evaluate answers:", error);
        alert("Failed to evaluate answers. Please try again.");
      }
    },
    generateNewQuiz() {
      this.generatedQuestions = [];
      this.userAnswers = [];
      this.evaluationResult = null;
      this.questionTheme = "";
      this.additionalPrompt = "";
      this.questionCount = ""; 
    },
  },
};
</script>



<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.fixed-bottom-container {
  flex-shrink: 0;
  padding: 10px;
  background-color: #2A2D3E;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #444;
}

.input,
.button,
.answer-input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #d5d3d3;
  background-color: #f4f4f4;
  color: black; 
}


.questions-list {
  margin-top: 20px;
}

.question {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #3B3E4E;
}

.evaluation-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #1e1e1e;
  border-radius: 5px;
  color: #fff;
}

.evaluation-result h4 {
  margin-bottom: 10px;
}

.evaluation-result div {
  margin-bottom: 15px;
}

.button {
  padding: 10px 20px;
  background-color: #4A90E2;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  width: auto; 
  margin: 0 auto; 
  display: block; 
}

.button:hover {
  background-color: #357ABD;
}

.button:disabled {
  background-color: #777;
  cursor: not-allowed;
}


.input:focus, .answer-input:focus {
  outline: none;
  border-color: #357ABD;
}


</style>