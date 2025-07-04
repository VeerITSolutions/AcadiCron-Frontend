import apiClient from "./apiClient";

export const fetchFrontGalleryData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-gallery`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontGalleryData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-gallery`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteFrontGalleryData = async (id: number) => {
  const response = await apiClient.delete(`/front-gallery/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontGalleryData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-gallery/${id}`, data);
  return response.data;
};
