import apiClient from "./apiClient";

export const fetchOnlineExam = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/online-exam`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createOnlineExam = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/online-exam`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteOnlineExam = async (id: number) => {
  const response = await apiClient.delete(`/online-exam/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editOnlineExam = async (id: number, data: any) => {
  const response = await apiClient.post(`/online-exam/${id}`, data);
  return response.data;
};
