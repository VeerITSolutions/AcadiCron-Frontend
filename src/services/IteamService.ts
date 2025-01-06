import apiClient from "./apiClient";

export const fetchIteamData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createIteamData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteIteamData = async (id: number) => {
  const response = await apiClient.delete(`/item/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editIteamData = async (id: number, data: any) => {
  const response = await apiClient.post(`/item/${id}`, data);
  return response.data;
};
