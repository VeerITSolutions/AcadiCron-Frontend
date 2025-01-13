import apiClient from "./apiClient";

export const fetchLeaveTypeData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/leave-type`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const fetchAlloatedLeaveTypeData = async (id: any) => {
  const response = await apiClient.get(`/leave-type/${id}`);
  return response.data;
};

export const createLeaveType = async (type: string): Promise<any> => {
  try {
    const response = await apiClient.post("/leave-type", { type });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteLeaveTypeData = async (id: number) => {
  const response = await apiClient.delete(`/leave-type/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editLeaveTypeData = async (id: number, type: string) => {
  const data = { type }; // Create an object with the name field
  const response = await apiClient.post(`/leave-type/${id}`, data);
  return response.data;
};
