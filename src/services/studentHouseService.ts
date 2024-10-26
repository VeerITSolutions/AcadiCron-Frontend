import apiClient from "./apiClient";

export const fetchStudentHouseData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/schoolhouse`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createStudentHouse = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/schoolhouse", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteStudentHouseData = async (id: number) => {
  const response = await apiClient.delete(`/schoolhouse/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentHouseData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/schoolhouse/${id}`, data);
  return response.data;
};
