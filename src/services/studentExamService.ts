import apiClient from "./apiClient";

export const fetchStudentexamData = async (id: string) => {
  const response = await apiClient.get(`/student-exam/${id}`);
  return response.data;
};


// Delete a student category by ID
export const deleteStudentexam = async (id: number) => {
  const response = await apiClient.delete(`/student-exam/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentexam = async (id: number, data: any) => {

  const response = await apiClient.post(`/student-exam/${id}`, data);
  return response.data;
};


// Edit a student category by ID
export const createStudentexam = async ( data : any) => {

  const response = await apiClient.post(`/student-exam`, data);
  return response.data;
};
