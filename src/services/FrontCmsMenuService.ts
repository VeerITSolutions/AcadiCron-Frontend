import apiClient from "./apiClient";

export const fetchFrontCmsMenus = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/frontcms-menus`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontCmsMenus = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/frontcms-menus`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteFrontCmsMenus = async (id: number) => {
  const response = await apiClient.delete(`/frontcms-menus/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontCmsMenus = async (id: number, data: any) => {
  const response = await apiClient.post(`/frontcms-menus/${id}`, data);
  return response.data;
};
