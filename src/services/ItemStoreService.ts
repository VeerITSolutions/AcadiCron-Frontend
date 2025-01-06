import apiClient from "./apiClient";

export const fetchItemStore = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item-store`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createItemStore = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-store`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteItemStore = async (id: number) => {
  const response = await apiClient.delete(`/item-store/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editItemStore = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-store/${id}`, data);
  return response.data;
};
