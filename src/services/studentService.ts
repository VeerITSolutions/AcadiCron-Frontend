import apiClient from "./apiClient";

export const fetchStudentData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
