import apiClient from "./apiClient";

export const fetchStudentDisabledData = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any) => {
  const response = await apiClient.get(`/admin/dtstudentlist/disabled`, {
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

/*
// Delete a student category by ID
export const deleteStudent = async (id: number) => {
  const response = await apiClient.delete(`/admin/dtstudentlist/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudent = async (id: number, category: string) => {
  const data = { category }; // Create an object with the name field
  const response = await apiClient.post(`/admin/dtstudentlist/${id}`, data);
  return response.data;
}; */
