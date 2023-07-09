import axios from "axios";
import { url } from "../../config";

// export const baseURL = "http://127.0.0.1:3000";



// Create an instance of axios with custom configuration
const axiosClient = axios.create({
    baseURL: url,
    timeout: 5000, // Set the request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json' // Set the request content type
    },
  });

  // Request interceptors for API calls
  axiosClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosClient;