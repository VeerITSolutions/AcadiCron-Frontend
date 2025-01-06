import apiClient from "./apiClient";

export const fetchIteamCategory = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item_category`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createIteamCategory = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item_category`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteIteamCategory = async (id: number) => {
  const response = await apiClient.delete(`/item_category/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editIteamCategory = async (id: number, data: any) => {
  const response = await apiClient.post(`/item_category/${id}`, data);
  return response.data;
};
