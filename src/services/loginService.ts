import apiClient from "./apiClient";



export const checkLogin = async (username: string, password: string) => {
  try {
    const data = { username, password };
    const response = await apiClient.post(`/login`, data);
    return response.data; // Success case
  } catch (error: any) {
    if (error.response) {
      // API responded with a 4xx or 5xx error
      return { success: false, message: error.response.data.message || "Login failed" };
    } else {
      // Network error or server unreachable
      return { success: false, message: "Network error, please try again later" };
    }
  }
};
