import apiClient from "./apiClient";

export const fetchItemStock = async (page?: any, perPage?: any, type?: any, selectedItemCategoryId?: any, selectedItemId?: any) => {
  const response = await apiClient.get(`/item-stock`, {
    params: {
      page,
      perPage,
      type,
      selectedItemCategoryId,
      selectedItemId
    }
  });
  return response.data;
};


export const createItemStock = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-stock`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteItemStock = async (id: number) => {
  const response = await apiClient.delete(`/item-stock/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editItemStock = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-stock/${id}`, data);
  return response.data;
};
