import apiClient from "./apiClient";

export const fetchContentSectionData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/content-section`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createContentSectionForUpload = async (title: string, type: string, date: string,  cls_sec_id: string, note: string, ): Promise<any> => {
  try {
    const response = await apiClient.post(`/content-section`, { title, type, date , cls_sec_id, note,});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteContentSectionForUpload = async (id: number) => {
  const response = await apiClient.delete(`/content-section/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editContentSectionForUpload = async (id: number, house_name: string) => {
  const data = { house_name, id }; // Create an object with the name field
  const response = await apiClient.post(`/content-section/${id}`, data);
  return response.data;
};
