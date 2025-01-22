import apiClient from "./apiClient";

export const fetchItemSupplier = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item-supplier`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createItemSupplier = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-supplier`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create item supplier");
  }
};



// Delete a student category by ID
export const deleteItemSupplier = async (id: number) => {
  const response = await apiClient.delete(`/item-supplier/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editItemSupplier = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-supplier/${id}`, data);
  return response.data;
};
