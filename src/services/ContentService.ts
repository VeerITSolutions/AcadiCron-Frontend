import apiClient from "./apiClient";

export const fetchContentData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/upload-content`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createContentForUpload = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/upload-content`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteContentForUpload = async (id: number) => {
  const response = await apiClient.delete(`/upload-content/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editContentForUpload = async (id: number, data: any) => {
  const response = await apiClient.post(`/upload-content/${id}`, data);
  return response.data;
};
