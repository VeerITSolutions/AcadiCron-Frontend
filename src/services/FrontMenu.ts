import apiClient from "./apiClient";

export const fetchFrontMenuData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-menus`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontMenuData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-menus`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteFrontMenuData = async (id: number) => {
  const response = await apiClient.delete(`/front-menus/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontMenuData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-menus/${id}`, data);
  return response.data;
};
