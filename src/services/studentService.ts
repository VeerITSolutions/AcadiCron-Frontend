import apiClient from "./apiClient";

export const fetchStudentData = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
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

export const fetchStudentSingleData = async (id: string) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
    params: {
      id
    },
  });
  return response.data;
};


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
};


// Edit a student category by ID
export const createStudent = async ( data : any) => {

  const response = await apiClient.post(`/student`, data);
  return response.data;
};
