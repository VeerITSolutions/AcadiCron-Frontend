import apiClient from "./apiClient";

export const fetchVehicleRoutes = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/vehicle-routes`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createVehicleRoutes = async (data?:any, selectedVehicles?: any): Promise<any> => {
  try {
    const response = await apiClient.post("/vehicle-routes", {data, selectedVehicles});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create transport route");
  }
};



// Delete a student category by ID
export const deleteVehicleRoutes = async (id: number) => {
  const response = await apiClient.delete(`/vehicle-routes/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editVehicleRoutes = async (id: number, data: any, selectedVehicles: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/vehicle-routes/${id}`, {data, selectedVehicles});
  return response.data;
};
