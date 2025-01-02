import apiClient from "./apiClient";

export const fetchTransportRouteData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/transport-route`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createTransportRoute = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/transport-route", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create transport route");
  }
};



// Delete a student category by ID
export const deleteTransportRoute = async (id: number) => {
  const response = await apiClient.delete(`/transport-route/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editTransportRoute = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/transport-route/${id}`, data);
  return response.data;
};
