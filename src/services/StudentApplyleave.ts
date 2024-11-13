import apiClient from "./apiClient";

export const fetchApplyleaveData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/sections`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createApplyleave = async (name: string): Promise<any> => {
  try {
    const response = await apiClient.post("/sections", { name });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create section");
  }
};



// Delete a student category by ID
export const deleteApplyleave = async (id: number) => {
  const response = await apiClient.delete(`/sections/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editApplyleave = async (id: number, section: string) => {
  const data = { section }; // Create an object with the name field
  const response = await apiClient.put(`/sections/${id}`, data);
  return response.data;
};
