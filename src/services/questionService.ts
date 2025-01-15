import apiClient from "./apiClient";

export const fetchQuestionData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/question`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createQuestionData = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/question", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create question");
  }
};



// Delete a student category by ID
export const deleteQuestionData = async (id: number) => {
  const response = await apiClient.delete(`/question/${id}`);
  return response.data;
};

// Edit a student category by ID

export const editQuestionData = async (
  id?: any,
  selectedClass ?: any, 
  selectedSection ?: any, 
  selectedSubject ?: any, 
  question_type?: any, 
  level?: any, 
  Attach_file?: any, 
  description?: string) => {
  const data = { id, selectedClass, selectedSection, selectedSubject, question_type, level, Attach_file,  description }; // Create an object with the name field
  const response = await apiClient.post(`/homework/${id}`, data);
  return response.data;
};
