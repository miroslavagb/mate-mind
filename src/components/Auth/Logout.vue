<!-- <template>
  <div class="logout-container">
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async logoutUser() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/logout');
        alert(response.data.message);
      } catch (error) {
        alert('An error occurred while logging out');
      }
    }
  }
}
</script> -->

  