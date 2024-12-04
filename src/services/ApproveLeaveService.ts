import apiClient from "./apiClient";


export const fetchApproveLeaveData = async (page: any, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string , id?: any) => {
  const response = await apiClient.get(`/approve-leave`, {
    params: {
      page,
      perPage,
      id,
      selectedClass,
      selectedSection,
      keyword,
    },
  });
  return response.data;
};


export const createApproveLeave = async (
  selectedClass ?: any,
  selectedSection ?: any,
  selectedStudent ?: any,
  student_session_id?: string,
  from_date?: any,
  to_date?: any,
  apply_date?: any,
  created_at?: any,
  docs?: any,
  reason?: any,
  status?: any,
  approve_by?: string,
  request_type?: string,
  staff_name?: string,
  staff_surname?: string,): Promise<any> => {
  try {
    const response = await apiClient.post("/approve-leave", { 
      selectedClass,
      selectedSection,
      selectedStudent, 
      student_session_id,
      from_date,
      to_date,
      apply_date,
      created_at,
      docs,
      reason,
      status,
      approve_by,
      request_type,
      staff_name,
      staff_surname });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create leave request");
  }
};

export const changeStatus = async (
  id: string, role_id: any): Promise<any> => {
  try {
    const response = await apiClient.get(`/approve-leave-change-status/${id}/${role_id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create leave request");
  }
};

// Delete a student category by ID
export const deleteApproveLeaveData = async (id: number) => {
  const response = await apiClient.delete(`/approve-leave/${id}`);
  return response.data;
};


export const editApproveLeaveData = async (
  currentLeaveId ?: any,
  selectedClass ?: any,
  selectedSection ?: any,
  selectedStudent ?: any,
  student_session_id ?: any,
  from_date ?: any,
  to_date ?: any,
  apply_date?: any,
  created_at?: string,
  docs?: any,
  reason?: any,
  status?: any,
  approve_by?: string,
  request_type?: string,
  staff_name?: string,
  staff_surname?: string,

 ) => {
  const data = { currentLeaveId,
    selectedClass,
    selectedSection,
    selectedStudent,
    student_session_id,
    from_date,
    to_date,
    apply_date,
    created_at,
    docs,
    reason,
    status,
    approve_by,
    request_type,
    staff_name,
    staff_surname };
  const response = await apiClient.post(`/approve-leave/${currentLeaveId}`, data);
  return response.data;
};