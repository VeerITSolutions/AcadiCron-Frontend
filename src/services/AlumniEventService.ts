import apiClient from "./apiClient";

export const fetchAlumniEventData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/alumni-event`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createAlumniEventData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/alumni-event`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteAlumniEventData = async (id: number) => {
  const response = await apiClient.delete(`/alumni-event/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editAlumniEventData = async (id: number, data: any) => {
  const response = await apiClient.post(`/alumni-event/${id}`, data);
  return response.data;
};
