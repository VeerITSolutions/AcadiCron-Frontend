import apiClient from "./apiClient";

export const fetchExpenseHeadData = async (page?: any, perPage?: any, type?: any) => {
  const response = await apiClient.get(`/expense-head`, {
    params: {
      page,
      perPage,
      type
    },
  });
  return response.data;
};


export const createExpenseHead = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/expense-head`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create expense head");
  }
};



// Delete a student category by ID
export const deleteExpenseHead = async (id: number) => {
  const response = await apiClient.delete(`/expense-head/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editExpenseHead = async (id: number, data: any) => {
  const response = await apiClient.post(`/expense-head/${id}`, data);
  return response.data;
};
