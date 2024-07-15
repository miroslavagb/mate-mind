<!-- <template>
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <input v-model="name" type="text" placeholder="Name" required>
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async registerUser() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        try {
          const response = await axios.post('http://127.0.0.1:5000/registration', {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          });
          alert(response.data.message);
          // Redirect or perform any other action upon successful registration
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert('An error occurred while registering. Please try again later.');
          }
        }
      }
    }
  };
  </script>
   -->