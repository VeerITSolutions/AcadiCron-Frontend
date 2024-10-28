import apiClient from "./apiClient";

export const fetchtimeTableData = async (page?: string, perPage?: string) => {
  const response = await apiClient.get(`/timetable`, {
    params: {
      page,
      perPage,
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
  const response = await apiClient.put(`/admin/dtstudentlist/${id}`, data);
  return response.data;
}; */
