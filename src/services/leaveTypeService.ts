import apiClient from "./apiClient";

export const fetchLeaveTypeData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/leave-type`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createLeaveType = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/leave-type", { house_name, description });
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
export const editLeaveTypeData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/leave-type/${id}`, data);
  return response.data;
};
