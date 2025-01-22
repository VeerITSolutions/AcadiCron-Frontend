import apiClient from "./apiClient";

export const fetchClassAssingTeacherData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/class-teacher`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createClassAssignTeacher = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post("/class-teacher", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create class section");
  }
};



// Delete a student category by ID
export const deleteClassAssignTeacher = async (class_id: any, section_id: any) => {
  const response = await apiClient.delete(`/class-teacher/${class_id}/${section_id}`);
  return response.data;
};

// Edit a student category by ID
export const editClassAssignTeacher = async (id: number, data: any) => {
  const response = await apiClient.post(`/class-teacher/${id}`, data);
  return response.data;
};
