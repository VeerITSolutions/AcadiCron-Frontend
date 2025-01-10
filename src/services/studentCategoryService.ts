import apiClient from "./apiClient";

export const fetchStudentCategoryData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/category`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


// Delete a student category by ID
export const deleteStudentCategoryData = async (id: number) => {
  const response = await apiClient.delete(`/category/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentCategoryData = async (id: number, category: string) => {
  const data = { category }; // Create an object with the name field
  const response = await apiClient.post(`/category/${id}`, data);
  return response.data;
};
