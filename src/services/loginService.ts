import apiClient from "./apiClient";



export const checkLogin = async (username: string, password: string) => {
  const data = { username, password }; // Create an object with the name field
  const response = await apiClient.post(`/login`, data);
  return response.data;
};
