import apiClient from "./apiClient";


export const fetchApproveLeaveData = async (page: any, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string , id?: any) => {
  const response = await apiClient.get(`/approve-leave`, {
    params: {
      page,
      perPage,
      id
    },
  });
  return response.data;
};


export const createApproveLeave = async (
  student_session_id?: string,
  from_date?: any,
  to_date?: any,
  apply_date?: any,
  created_at?: any,
  docs?: any,
  reason?: any,
  status?: any,
  approve_by?: string,
  request_type?: string): Promise<any> => {
  try {
    const response = await apiClient.post("/approve-leave", {  
      student_session_id,
      from_date,
      to_date,
      apply_date,
      created_at,
      docs,
      reason,
      status,
      approve_by,
      request_type,});
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
  currentLeaveId?: any,
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

 ) => {
  const data = { currentLeaveId,student_session_id,
    from_date,
    to_date,
    apply_date,
    created_at,
    docs,
    reason,
    status,
    approve_by,
    request_type, };
  const response = await apiClient.post(`/approve-leave/${currentLeaveId}`, data);
  return response.data;
};