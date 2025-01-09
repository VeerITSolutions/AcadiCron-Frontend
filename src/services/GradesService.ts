import apiClient from "./apiClient";

export const fetchGradesData = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/grades`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createGradesData = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/grades`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteGradesData = async (id: number) => {
  const response = await apiClient.delete(`/grades/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editGradesData = async (id: number, data: any) => {
  const response = await apiClient.post(`/grades/${id}`, data);
  return response.data;
};
