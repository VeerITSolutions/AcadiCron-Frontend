import apiClient from "./apiClient";

export const fetchContentForUploadData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/content-for-upload`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createContentForUpload = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/content-for-upload", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteConetentForUpload = async (id: number) => {
  const response = await apiClient.delete(`/content-for-upload/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editConententForUpload = async (id: number, house_name: string) => {
  const data = { house_name, id }; // Create an object with the name field
  const response = await apiClient.put(`/content-for-upload/${id}`, data);
  return response.data;
};
