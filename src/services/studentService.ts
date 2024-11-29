import apiClient from "./apiClient";

export const fetchStudentData = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any, selectedSessionId?:any ,bulkDelete?:any) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      keyword,
      selectedSessionId,
      bulkDelete
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
export const editStudent = async (id: number, data: any) => {

  const response = await apiClient.post(`/student/${id}`, data);
  return response.data;
};


// Edit a student category by ID
export const createStudent = async ( data : any) => {

  const response = await apiClient.post(`/student`, data);
  return response.data;
};


// Delete a student deleteStudentDocuemnt
export const deleteStudentDocuemnt = async (id: number) => {
  const response = await apiClient.delete(`/student-doc/${id}`);
  return response.data;
};

// Delete a student category by ID
export const deleteStudentTimeline = async (id: number) => {
  const response = await apiClient.delete(`/student-timeline/${id}`);
  return response.data;
};
