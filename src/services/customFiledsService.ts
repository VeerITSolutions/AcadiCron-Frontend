import apiClient from "./apiClient";

export const fetchCustomFiledsData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/custome-filds`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};

export const fetchGetCustomFiledsData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/get-custome-filds`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createCustomFileds = async (data:any ): Promise<any> => {
  try {
    const response = await apiClient.post("/custome-filds", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create CustomFileds");
  }
};



// Delete a student category by ID
export const deleteCustomFiledsData = async (id: number) => {
  const response = await apiClient.delete(`/custome-filds/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editCustomFiledsData = async (id: number, data: any) => {
   // Create an object with the name field
  const response = await apiClient.post(`/custome-filds/${id}`, data);
  return response.data;
};
