import apiClient from "./apiClient";

export const fetchStudentdocData = async (id: string) => {
  const response = await apiClient.get(`/student-doc/${id}`);
  return response.data;
};


// Delete a student category by ID
export const deleteStudentdoc = async (id: number) => {
  const response = await apiClient.delete(`/student-doc/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentdoc = async (id: number, data: any) => {

  const response = await apiClient.post(`/student-doc/${id}`, data);
  return response.data;
};


// Edit a student category by ID
export const createStudentdoc = async ( data : any) => {

  const response = await apiClient.post(`/student-doc`, data);
  return response.data;
};


export const createStudentDisable = async ( data : any) => {

  const response = await apiClient.post(`/student-disabled`, data);
  return response.data;
};
