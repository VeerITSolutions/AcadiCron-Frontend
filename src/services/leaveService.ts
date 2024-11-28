import apiClient from "./apiClient";

export const fetchLeaveData = async (page: any, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string , id?: any) => {
  const response = await apiClient.get(`/leave-request`, {
    params: {
      page,
      perPage,
      id
    },
  });
  return response.data;
};



export const createLeave = async (
  selectedRoleLeave : any,
  selectedStaff : any,
  selectedLeaveType : any,
  date: any,
  leave_type_id: string,
  leave_from: any,
  leave_to: any,
  employee_remark: string,
  admin_remark: string,
  document_file: any,
  status: any): Promise<any> => {
  try {
    const response = await apiClient.post("/leave-request", { date, selectedLeaveType,


      selectedRoleLeave,
selectedStaff,
leave_from, leave_to, employee_remark, admin_remark, document_file  ,status});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create leave request");
  }
};



// Delete a student category by ID
export const deleteLeaveData = async (id: number) => {
  const response = await apiClient.delete(`/leave-request/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editLeaveData = async (
  currentLeaveId: any,
  selectedRoleLeave : any,
  selectedStaff : any,
  selectedLeaveType : any,
  date: any,
  leave_type_id: string,
  leave_from: any,
  leave_to: any,
  employee_remark: string,
  admin_remark: string,
  document_file: any,
  status: any,
id: any) => {
  const data = { currentLeaveId, date, selectedLeaveType,
selectedRoleLeave,
selectedStaff,
leave_from, leave_to, employee_remark, admin_remark, document_file  ,status }; // Create an object with the name field
  const response = await apiClient.post(`/leave-request/${currentLeaveId}`, data);
  return response.data;
};
