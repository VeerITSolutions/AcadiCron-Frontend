import apiClient from "./apiClient";

export const fetchFrontMediaGalleryData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-media-gallery`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createFrontMediaGalleryData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-media-gallery`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteFrontMediaGalleryData = async (id: number) => {
  const response = await apiClient.delete(`/front-media-gallery/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFrontMediaGalleryData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-media-gallery/${id}`, data);
  return response.data;
};
