import apiClient from "./apiClient";

export const fetchItemIssue = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item-issue`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createItemIssue = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-issue`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteItemIssue = async (id: number) => {
  const response = await apiClient.delete(`/item-issue/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editItemIssue = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-issue/${id}`, data);
  return response.data;
};
