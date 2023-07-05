import axios from "axios";

export const baseURL = "http://127.0.0.1:3000";

// Create an instance of axios with custom configuration
const axiosClient = axios.create({
    baseURL: baseURL,
    timeout: 5000, // Set the request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Set the request content type
    },
  });

export default axiosClient;