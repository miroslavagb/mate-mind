<template>
  <div>
    <input type="file" @change="fileSelected">
    <button @click="uploadBook" :disabled="!selectedFile">Upload</button>
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`, //  JWT token here
            'Content-Type': 'multipart/form-data'
          }
        });
        this.$emit('book-uploaded', response.data.book);  //  backend sends back some book details
        alert('Book uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload book:', error);
        alert('Failed to upload book: ' + (error.response ? error.response.data.error : 'Network error'));
      }
    }
  }
};
</script>

