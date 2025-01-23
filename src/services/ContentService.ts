import apiClient from "./apiClient";

export const fetchContentData = async (page?: number, perPage?: number, type?: any) => {
  const response = await apiClient.get(`/content`, {
    params: {
      page,
      perPage,
      type
    },
  });
  return response.data;
};


export const createContentForUpload = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/content-for-upload`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create content");
  }
};

export const createContentData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/content`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create content");
  }
};

// Delete a student category by ID
export const deleteContentForUpload = async (id: number) => {
  const response = await apiClient.delete(`/content-for-upload/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editContentForUpload = async (id: number, data: any) => {
  const response = await apiClient.post(`/content-for-upload/${id}`, data);
  return response.data;
};


export const deleteContentData = async (id: number) => {
  const response = await apiClient.delete(`/content/${id}`);
  return response.data;
};