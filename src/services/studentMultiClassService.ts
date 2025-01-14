import apiClient from "./apiClient";

export const fetchStudentMultiClass = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any) => {
  const response = await apiClient.post(`/update-multi-class`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      keyword
    },
  });
  return response.data;
};

