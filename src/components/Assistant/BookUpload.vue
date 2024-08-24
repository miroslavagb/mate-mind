<template>
  <div>
    <input type="file" @change="fileSelected">
    <div class="upload-button-container">
      <button @click="uploadBook" :disabled="!selectedFile" class="upload-button">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    fileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadBook() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.postForm('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        this.$emit('book-uploaded', response.data);  // Emit the newly uploaded file
        alert('Book uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload book:', error);
        alert('Failed to upload book: ' + (error.response ? error.response.data.error : 'Network error'));
      }
    },
  }
};
</script>

<style scoped>
.upload-button-container {
  margin-bottom: 20px;
}
</style>
