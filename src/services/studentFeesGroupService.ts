import apiClient from "./apiClient";

export const fetchStudentFeesGroupData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/fees-group`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createFeesGroup = async (name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-group", { name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteFeesGroupData = async (id: number) => {
  const response = await apiClient.delete(`/fees-group/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesGroupData = async (id: number, type: string, description: string) => {
  const data = { type, description }; // Create an object with the name field
  const response = await apiClient.put(`/fees-group/${id}`, data);
  return response.data;
};
