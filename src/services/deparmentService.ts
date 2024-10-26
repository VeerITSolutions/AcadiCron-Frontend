import apiClient from "./apiClient";

export const fetchdeparmentData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/department`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createdeparment = async (department_name: string): Promise<any> => {
  try {
    const response = await apiClient.post("/department", { department_name });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create deparment");
  }
};



// Delete a student category by ID
export const deletedeparment = async (id: number) => {
  const response = await apiClient.delete(`/department/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editdeparment = async (id: number, department_name: string) => {
  const data = { department_name }; // Create an object with the name field
  const response = await apiClient.put(`/department/${id}`, data);
  return response.data;
};
