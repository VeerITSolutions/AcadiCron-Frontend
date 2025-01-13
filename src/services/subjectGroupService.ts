import apiClient from "./apiClient";

export const fetchSubjectGroupData = async (page?: any, perPage?: any, class_id?: any, section_id?: any , getselectedSessionId?: any) => {
  const response = await apiClient.get(`/subject-groups`, {
    params: {
      page,
      perPage,
      class_id,
      section_id,
      getselectedSessionId
    },
  });
  return response.data;
};


export const createSubjectGroup = async (name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/subject-groups", { name, description});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create subject group");
  }
};

export const createSubjectGroupAdd = async (data: any, subject_group: any, section_group: any,session_id : any ): Promise<any> => {
  try {

    const response = await apiClient.post("/subject-groups-create", { data, subject_group, section_group, session_id});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create subject group");
  }
};



// Delete a student category by ID
export const deleteSubjectGroup = async (id: number) => {
  const response = await apiClient.delete(`/subject-groups/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editSubjectGroup = async (id: number, name: any, subject_group: any, section_group: any, session_id : any) => {
  const response = await apiClient.post(`/subject-groups/${id}`, { name, subject_group, section_group, session_id});
  return response.data;
};
