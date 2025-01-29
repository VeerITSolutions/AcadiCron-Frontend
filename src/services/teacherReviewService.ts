import apiClient from "./apiClient";

export const fetchTeacherReviewData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/teacher-review`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


// Delete a student category by ID
export const deleteTeacherReviewData = async (id: any) => {
  const response = await apiClient.delete(`/teacher-review/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editTeacherReviewData = async (id: any, data: any) => {
 // Create an object with the name field
  const response = await apiClient.post(`/teacher-review/${id}`, data);
  return response.data;
};
