// /services/categoryService.ts

import apiClient from "./apiClient";



export const createCategory = async (category: string): Promise<any> => {
  try {
    const response = await apiClient.post("/categories", { category });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create category");
  }
};
