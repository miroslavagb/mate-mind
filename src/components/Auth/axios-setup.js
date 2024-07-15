import axios from 'axios';

// Configure Axios to send cookies with each request
axios.defaults.withCredentials = true;

export default axios;
