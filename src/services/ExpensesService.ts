import apiClient from "./apiClient";

export const fetchExpensesData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/expenses`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createExpenses = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/expenses`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteExpenses = async (id: number) => {
  const response = await apiClient.delete(`/expenses/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editExpenses = async (id: number, data: any) => {
  const response = await apiClient.post(`/expenses/${id}`, data);
  return response.data;
};
