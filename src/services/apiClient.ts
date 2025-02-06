// services/apiClient.ts

import axios from "axios";
import { destroyCookie } from "nookies";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://acadicronbackend.educron.com/api", // Set base URL
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor to inject token if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle invalid tokens
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized status
    if (error.response && error.response.status === 401) {
      // Logout user
      logoutUser();
    }
    return Promise.reject(error);
  }
);

function logoutUser() {
  // Clear user data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role_id');
  localStorage.removeItem('role_name');
  localStorage.removeItem('is_superadmin');
  destroyCookie(null, "token", { path: "/" });
  // Redirect to login page or show a message
  window.location.href = '/login'; // Adjust the URL based on your routing
}

export default apiClient;
