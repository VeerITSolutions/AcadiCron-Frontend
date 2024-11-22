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


export const createClassAssignTeacher = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/class-teacher", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create class section");
  }
};



// Delete a student category by ID
export const deleteClassAssignTeacher = async (id: number) => {
  const response = await apiClient.delete(`/class-teacher/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editClassAssignTeacher = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/class-teacher/${id}`, data);
  return response.data;
};
