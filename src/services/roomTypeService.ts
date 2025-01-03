import apiClient from "./apiClient";

export const fetchRoomtypeData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/roomtype`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createRoomtype = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/roomtype", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create roomtype");
  }
};



// Delete a student category by ID
export const deleteRoomtype = async (id: number) => {
  const response = await apiClient.delete(`/roomtype/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editRoomtype = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/roomtype/${id}`, data);
  return response.data;
};
