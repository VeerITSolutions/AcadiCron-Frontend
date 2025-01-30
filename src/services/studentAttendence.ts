import apiClient from "./apiClient";

export const fetchStudentAttendencByClassSectionData = async (
  selectedClass?: any,
  selectedSection?: any,
  selectedSubjectGroup?: any,
  selectedSessionId?: any,) => {
  const response = await apiClient.get(`/student-attendance-by-class-section`, {
    params: {
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSessionId
    },
  });
  return response.data;
};

export const fetchStudentAttendencData = async (
  data: any) => {
  const response = await apiClient.post(`/get-student-attendance`, data);
  return response.data;
};



// Edit a student category by ID
export const createStudentAttendencData = async ( data : any) => {

  const response = await apiClient.post(`/student-attendance`, data);
  return response.data;
};


// Edit a student category by ID
export const editStudentAttendencData = async (id: number, data: any) => {

  const response = await apiClient.post(`/student-attendance/${id}`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteStudentAttendencData = async (id: number) => {
  const response = await apiClient.delete(`/student-attendance/${id}`);
  return response.data;
};
