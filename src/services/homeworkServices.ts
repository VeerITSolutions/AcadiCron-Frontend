import apiClient from "./apiClient";

export const fetchHomeWorkData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/homework`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createHomeWork = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/homework", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Home work");
  }
};



// Delete a student category by ID
export const deleteHomeWorkData = async (id: number) => {
  const response = await apiClient.delete(`/homework/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editHomeWorkData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/homework/${id}`, data);
  return response.data;
};
