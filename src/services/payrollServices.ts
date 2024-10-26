import apiClient from "./apiClient";

export const fetchPayrollData = async (page: number, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string) => {
  const response = await apiClient.get(`/staff-payroll`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createPayroll = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/staff-payroll", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create staff payroll");
  }
};



// Delete a student category by ID
export const deletePayroll = async (id: number) => {
  const response = await apiClient.delete(`/staff-payroll/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editpayroll = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/staff-payroll/${id}`, data);
  return response.data;
};
