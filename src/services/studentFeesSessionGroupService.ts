import apiClient from "./apiClient";

export const fetchStudentFeesSeesionGroupData = async (page: number, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string) => {
  const response = await apiClient.get(`/fees-session-group`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createFeesSeesionGroup = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-session-group", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteFeesSessionGroup = async (id: number) => {
  const response = await apiClient.delete(`/fees-master/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesSessionGroup = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/fees-master/${id}`, data);
  return response.data;
};
