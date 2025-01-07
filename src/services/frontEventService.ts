import apiClient from "./apiClient";

export const fetchEventData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/front-event`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createEventData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/front-event`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to add student");
  }
};



// Delete a student category by ID
export const deleteEventData = async (id: number) => {
  const response = await apiClient.delete(`/front-event/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editEventData = async (id: number, data: any) => {
  const response = await apiClient.post(`/front-event/${id}`, data);
  return response.data;
};
