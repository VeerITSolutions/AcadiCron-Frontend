import apiClient from "./apiClient";

export const fetchIteamStock = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item-stock`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createIteamStock = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-stock`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteIteamStock = async (id: number) => {
  const response = await apiClient.delete(`/item-stock/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editIteamStock = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-stock/${id}`, data);
  return response.data;
};
