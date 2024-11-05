import apiClient from "./apiClient";

export const fetchSubjectGroupData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/subject-groups`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createSubjectGroup = async (name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/subject-groups", { name, description});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create subject group");
  }
};



// Delete a student category by ID
export const deleteSubjectGroup = async (id: number) => {
  const response = await apiClient.delete(`/subject-groups/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editSubjectGroup = async (id: number, name:  string, description: string) => {
  const data = { name, description }; // Create an object with the name field
  const response = await apiClient.put(`/subject-groups/${id}`, data);
  return response.data;
};
