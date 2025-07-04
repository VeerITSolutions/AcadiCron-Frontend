import apiClient from "./apiClient";

export const fetchFrontNewsData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-news`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontNewsData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-news`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteFrontNewsData = async (id: number) => {
  const response = await apiClient.delete(`/front-news/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontNewsData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-news/${id}`, data);
  return response.data;
};
