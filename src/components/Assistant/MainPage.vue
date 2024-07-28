<template>
    <div>
      <book-upload @book-uploaded="handleBookUploaded"></book-upload>
      <chat-box v-if="bookUploaded" :book="currentBook"></chat-box>
    </div>
  </template>
  
  <script>
  import BookUpload from './BookUpload.vue';
  import ChatBox from './ChatBox.vue';
  
  export default {
    components: {
      BookUpload,
      ChatBox
    },
    data() {
      return {
        bookUploaded: false,
        currentBook: null
      };
    },
    methods: {
      handleBookUploaded(book) {
        this.currentBook = book;
        this.bookUploaded = true;
      }
    }
  };
  </script>
  