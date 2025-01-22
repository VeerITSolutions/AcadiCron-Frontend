import apiClient from "./apiClient";

export const fetchItemData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any, selectedItemCategoryId?: any) => {
  const response = await apiClient.get(`/item`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType,
      selectedItemCategoryId
    }
  });
  return response.data;
};

export const fetchGetItemData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any, selectedItemCategoryId?: any) => {
  const response = await apiClient.get(`/get-item`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType,
      selectedItemCategoryId
    }
  });
  return response.data;
};


export const createItemData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create item");
  }
};



// Delete a student category by ID
export const deleteItemData = async (id: number) => {
  const response = await apiClient.delete(`/item/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editItemData = async (id: number, data: any) => {
  const response = await apiClient.post(`/item/${id}`, data);
  return response.data;
};
