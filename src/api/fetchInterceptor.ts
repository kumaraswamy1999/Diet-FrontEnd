
import axios from "axios";
 
const fetchInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
 
// Request interceptor
fetchInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
// Response interceptor
fetchInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
 
export default fetchInterceptor;
 