import apiClient from "./apiClient";

export const fetchTeacherData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/teacher`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


// Delete a student category by ID
export const deleteTeacherData = async (id: number) => {
  const response = await apiClient.delete(`/teacher/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editTeacherData = async (id: number, category: string) => {
  const data = { category }; // Create an object with the name field
  const response = await apiClient.post(`/teacher/${id}`, data);
  return response.data;
};
