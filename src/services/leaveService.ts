import apiClient from "./apiClient";

export const fetchLeaveData = async (page: number, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string) => {
  const response = await apiClient.get(`/leave-request`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};






export const createLeave = async (date: string,
  leave_type_id: string,
  leave_from: string,
  leave_to: string,
  reason: string,
  document_file: any): Promise<any> => {
  try {
    const response = await apiClient.post("/leave-request", { date, leave_type_id, leave_from, leave_to, reason, document_file });
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
export const editLeaveData = async (id: number,date: string,
  leave_type_id: string,
  leave_from: string,
  leave_to: string,
  reason: string,
  document_file: any) => {
  const data = { date, leave_type_id, leave_from, leave_to, reason, document_file }; // Create an object with the name field
  const response = await apiClient.put(`/leave-request/${id}`, data);
  return response.data;
};
