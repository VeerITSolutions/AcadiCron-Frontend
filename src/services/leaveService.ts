import apiClient from "./apiClient";

export const fetchLeaveData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/leave-request`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createLeave = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/leave-request", { house_name, description });
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
export const editLeaveData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/leave-request/${id}`, data);
  return response.data;
};