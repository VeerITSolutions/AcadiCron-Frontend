import apiClient from "./apiClient";

export const fetchStudentCategoryData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/category`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
