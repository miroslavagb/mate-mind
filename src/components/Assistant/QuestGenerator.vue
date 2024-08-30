<template>
  <div class="quiz-container">
    <div class="scroll-container">
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
          <ul class="options-list">
            <li v-for="option in question.options" :key="option.id" class="option-item">
              <input
                type="radio"
                :name="'question_' + index"
                :value="option.key"
                v-model="userAnswers[index]"
                class="radio-input"
              />
              <label>{{ option.key }}: {{ option.value }}</label>
            </li>
          </ul>
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
        console.log("Failed to generate questions. Please try again.");
        this.generating = false;
      }
    },
    async evaluateAnswers() {
      const token = localStorage.getItem("token");
      if (!this.book || !this.book.id) {
        console.log("No book selected for evaluation.");
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
          console.log("Please select an answer for all questions.");
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
        console.log("Failed to evaluate answers. Please try again.");
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

.input,
.button {
  display: block;
  width: 70%;
  max-width: 400px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d5d3d3;
  background-color: #f4f4f4;
  color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 14px;
}

.questions-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question {
  width: 100%;
  max-width: 700px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #3B3E4E;
}

.options-list {
  list-style-type: none;
  padding: 0;
}

.option-item {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.radio-input {
  margin-right: 10px;
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
  background-color: #4A90E2;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  padding: 8px 16px;
  width: auto;
}

.button:hover {
  background-color: #357ABD;
}

.input:focus {
  outline: none;
  border-color: #357ABD;
}

.fixed-bottom-container {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 10px;
  background-color: #2A2D3E;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #444;
}
</style>
