import apiClient from "./apiClient";

export const fetchSubjectData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/subjects`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createSubject = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/subjects", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteSubject = async (id: number) => {
  const response = await apiClient.delete(`/subjects/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editSubject = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/subjects/${id}`, data);
  return response.data;
};
