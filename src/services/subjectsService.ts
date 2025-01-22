import apiClient from "./apiClient";

export const fetchSubjectData = async (page?: any, perPage?: any, subject_gropu_id?: any,getselectedSessionId?: any) => {
  const response = await apiClient.get(`/subjects`, {
    params: {
      page,
      perPage,
      subject_gropu_id,
      getselectedSessionId
    },
  });
  return response.data;
};


export const createSubject = async (name: string, code: string, type: string, is_active: string): Promise<any> => {
  try {
    const response = await apiClient.post("/subjects", { name,code,type,is_active});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create subject");
  }
};



// Delete a student category by ID
export const deleteSubject = async (id: number) => {
  const response = await apiClient.delete(`/subjects/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editSubject = async (id: number, name: string, code: string, type: string, is_active: string) => {
  const data = { name, code, type, is_active }; // Create an object with the name field
  const response = await apiClient.post(`/subjects/${id}`, data);
  return response.data;
};
