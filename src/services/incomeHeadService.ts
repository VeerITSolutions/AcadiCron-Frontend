import apiClient from "./apiClient";

export const fetchIncomeHeadData = async (page?: any, perPage?: any, type?: any) => {
  const response = await apiClient.get(`/income-head`, {
    params: {
      page,
      perPage,
      type
    },
  });
  return response.data;
};


export const createIncomeHead = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/income-head`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create income head");
  }
};



// Delete a student category by ID
export const deleteIncomeHead = async (id: number) => {
  const response = await apiClient.delete(`/income-head/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editIncomeHead = async (id: number, data: any) => {
  const response = await apiClient.post(`/income-head/${id}`, data);
  return response.data;
};
