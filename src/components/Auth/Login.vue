   <!-- <template>
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template> -->
  
  <!-- <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/login', {
            email: this.email,
            password: this.password
          });
          alert(response.data.message);
          // Redirect or perform any other action upon successful login
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    }
  }
  </script>
   -->

   <!-- //TRADITIONAL OPTION  -->