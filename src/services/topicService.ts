import apiClient from "./apiClient";

export const fetchTopic = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any , sessionId? : any) => {
  const response = await apiClient.get(`/topic`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType,
      sessionId
    }
  });
  return response.data;
};


export const createTopic = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/topic`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};

export const getTopicBySubjectId = async (subId: any, classSectionId : any): Promise<any> => {
  try {
    const response = await apiClient.post(`/get-topic-by-subjectid`, {subId,classSectionId});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};

// Delete a student category by ID
export const deleteTopic = async (id: number) => {
  const response = await apiClient.delete(`/topic/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editTopic = async (id: number, data: any) => {
  const response = await apiClient.post(`/topic/${id}`, data);
  return response.data;
};
