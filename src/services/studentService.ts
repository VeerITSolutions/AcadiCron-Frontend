import apiClient from "./apiClient";

export const fetchStudentData = async (
  page?: any,
  perPage?: any,
  selectedClass?: any,
  selectedSection?: any,
  keyword?: any,
  selectedSessionId?: any,
  bulkDelete?: any,
  attendance?: any,
  attendance_date?: any,
  selectedCategory?: any,
  selectedGender?: any,
  selectedRTE?: any,
) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      keyword,
      selectedSessionId,
      bulkDelete,
      attendance,
      attendance_date,
      selectedCategory,
      selectedGender,
      selectedRTE,
    },
  });
  return response.data;
};
export const fetchStudentHomeworkData = async (id?: any) => {
  const response = await apiClient.post(`/get-students-homework`, {
    id: id,
  });
  return response.data;
};

export const fetchStudentCalculateData = async (
  page?: number,
  perPage?: number,
  selectedClass?: any,
  selectedSection?: any,
  keyword?: any,
  selectedSessionId?: any,
) => {
  const response = await apiClient.post(`/calculate-balances`, {
    selectedClass,
    selectedSection,
    keyword,
    selectedSessionId,
  });
  return response.data;
};
export const fetchStudentSingleData = async (id: string) => {
  const response = await apiClient.get(`/admin/dtstudentlist`, {
    params: {
      id,
    },
  });
  return response.data;
};

export const fetchAdmissionYearData = async (page?: any) => {
  const response = await apiClient.get(`/admission-year`, {
    params: {
      page,
    },
  });
  return response.data;
};

// Delete a student category by ID
export const deleteStudent = async (id: number) => {
  const response = await apiClient.delete(`/admin/dtstudentlist/${id}`);
  return response.data;
};

export const deleteStudentBluk = async (data: any) => {
  const response = await apiClient.post(`/admin/deletestudentbulk`, data);
  return response.data;
};

// Edit a student category by ID
export const editStudent = async (id: number, data: any) => {
  const response = await apiClient.post(`/student/${id}`, data);
  return response.data;
};

// Edit a student category by ID
export const createStudent = async (data: any) => {
  const response = await apiClient.post(`/student`, data);
  return response.data;
};
export const createPromotedStudent = async (data: any) => {
  const response = await apiClient.post(`/student-promoted`, data);
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
