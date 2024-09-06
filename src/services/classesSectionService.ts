import apiClient from "./apiClient";

export const fetchclassesSectionData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/class-sections`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createclassesSection = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/class-sections", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create class section");
  }
};



// Delete a student category by ID
export const deleteclassesSection = async (id: number) => {
  const response = await apiClient.delete(`/class-sections/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editclassesSection = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/class-sections/${id}`, data);
  return response.data;
};
