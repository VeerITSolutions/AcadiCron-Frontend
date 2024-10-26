import apiClient from "./apiClient";

export const fetchStudentFeesDiscountData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/fees-discount`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createFeesDiscount = async (name: string, code: string, amount: string, description: string, is_active: string): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-discount", { name, code, amount, description, is_active });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteFeesDiscountData = async (id: number) => {
  const response = await apiClient.delete(`/fees-discount/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesDiscountData = async (id: number, name: string, code: string, amount: string, description: string, is_active: string) => {
  const data = { name, code, amount, description, is_active}; // Create an object with the name field
  const response = await apiClient.put(`/fees-discount/${id}`, data);
  return response.data;
};
