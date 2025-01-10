import apiClient from "./apiClient";

export const fetchLesson = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any) => {
  const response = await apiClient.get(`/item-store`, {
    params: {
      page,
      perPage,
      type,
      selectedSearchType
    }
  });
  return response.data;
};


export const createLesson = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/item-store`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};

export const getLessonBySubjectId = async (subId: any, classSectionId : any): Promise<any> => {
  try {
    const response = await apiClient.post(`/get-lessonplan-by-subjectid`, {subId,classSectionId});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};

// Delete a student category by ID
export const deleteLesson = async (id: number) => {
  const response = await apiClient.delete(`/item-store/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editLesson = async (id: number, data: any) => {
  const response = await apiClient.post(`/item-store/${id}`, data);
  return response.data;
};
