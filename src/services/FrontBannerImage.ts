import apiClient from "./apiClient";

export const fetchFrontBannerImageData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-banner-image`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontBannerImageData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-banner-image`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteFrontBannerImageData = async (id: number) => {
  const response = await apiClient.delete(`/front-banner-image/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontBannerImageData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-banner-image/${id}`, data);
  return response.data;
};
