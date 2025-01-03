import apiClient from "./apiClient";

export const fetchVehiclesData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/vehicles`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createVehiclesData = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/vehicles", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create transport route");
  }
};



// Delete a student category by ID
export const deleteVehiclesData = async (id: number) => {
  const response = await apiClient.delete(`/vehicles/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editVehiclesData = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/vehicles/${id}`, data);
  return response.data;
};
