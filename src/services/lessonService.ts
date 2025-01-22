import apiClient from "./apiClient";

export const fetchLesson = async (page?: any, perPage?: any, type?: any, selectedSearchType?: any , sessionId? : any) => {
  const response = await apiClient.get(`/lesson`, {
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


export const createLesson = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/lesson`, data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create lesson");
  }
};

export const getLessonBySubjectIdLessonTable = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/get-lesson-by-subject-id`, data);
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
  const response = await apiClient.delete(`/lesson/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editLesson = async (id: number, data: any) => {
  const response = await apiClient.post(`/lesson/${id}`, data);
  return response.data;
};
