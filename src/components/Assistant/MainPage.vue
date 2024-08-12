<!-- <template>
  <div>
    <book-upload @book-uploaded="handleBookUploaded"></book-upload>
    <chat-box v-if="bookUploaded" :book="currentBook"></chat-box>
    <question-generator v-if="bookUploaded" :book="currentBook"></question-generator>
  </div>
</template>

<script>
import BookUpload from './BookUpload.vue';
import ChatBox from './ChatBox.vue';
import QuestionGenerator from './QuestGenerator.vue';


export default {
  components: {
    BookUpload,
    ChatBox,
    QuestionGenerator,
  },
  data() {
    return {
      bookUploaded: false,
      currentBook: null,
    };
  },
  methods: {
    handleBookUploaded(book) {
      this.currentBook = book;
      this.bookUploaded = true;
    },
  },
};
</script>

<style> 

</style> -->