<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">Upload File</button>

    <div v-if="evaluationResults">
      <h2>Evaluation Results</h2>
      <ul>
        <li v-for="result in evaluationResults" :key="result.question_id">
          <p>Question: {{ result.question_title }}</p>
          <p>Selected Option: {{ result.selected_option }}</p>
          <p>Correct Option: {{ result.correct_option }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const fileToUpload = ref(null);
const evaluationResults = ref(null);

const handleFileUpload = (event) => {
  fileToUpload.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!fileToUpload.value) {
    alert('Please select a file to upload');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileToUpload.value);

  try {
    const userId = localStorage.getItem('user_id');
    const response = await axios.postForm('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-Id': userId // Set the User-Id header
      }
    });
    alert('File uploaded successfully');
    // Optionally, display response data or perform other actions
  } catch (error) {
    alert('An error occurred while uploading the file');
    console.error(error);
  }
};

const evaluateTest = async () => {
  try {
    const userId = localStorage.getItem('user_id');
    const response = await axios.postForm('http://127.0.0.1:5000/evaluate', { /*evaluation data */ }, {
      headers: {
        'User-Id': userId
      }
    });
    evaluationResults.value = response.data.evaluation_response;
  } catch (error) {
    alert('An error occurred while evaluating the test');
    console.error(error);
  }
};
</script>
