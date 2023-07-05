import axios from 'axios';

// Create an instance of Axios with custom configuration
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Set the base URL for your backend server
  headers: {
    'Content-Type': 'application/json', // Set the desired content type header
    // Add any other headers required for your backend API
  },
  // You can also configure authentication settings here, such as adding an authorization token
});

export default axiosClient;