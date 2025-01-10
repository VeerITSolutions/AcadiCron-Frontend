import apiClient from "./apiClient";

export const fetchquestionData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/question`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createquestionData = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/question", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create question");
  }
};



// Delete a student category by ID
export const deletequestionData = async (id: number) => {
  const response = await apiClient.delete(`/question/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editquestionData = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/question/${id}`, data);
  return response.data;
};
