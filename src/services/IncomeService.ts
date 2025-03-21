import apiClient from "./apiClient";

export const fetchIncomeData = async (page?: number, perPage?: number, selectedSearchType?: any, selectedStartDate?: any, selectedEndDate?: any) => {
  const response = await apiClient.get(`/income`, {
    params: {
      page,
      perPage,
      selectedSearchType,
      selectedStartDate,
      selectedEndDate
    },
  });
  return response.data;
};


export const createIncome = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/income`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create income");
  }
};



// Delete a student category by ID
export const deleteIncome = async (id: number) => {
  const response = await apiClient.delete(`/income/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editIncome = async (id: number, data: any) => {
  const response = await apiClient.post(`/income/${id}`, data);
  return response.data;
};
