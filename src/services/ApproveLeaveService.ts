import apiClient from "./apiClient";

export const fetchApproveLeaveData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/approve-leave`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createApproveLeave = async (type: string): Promise<any> => {
  try {
    const response = await apiClient.post("/approve-leave", { type });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteApproveLeaveData = async (id: number) => {
  const response = await apiClient.delete(`/approve-leave/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editApproveLeaveData = async (id: number, type: string) => {
  const data = { type }; // Create an object with the name field
  const response = await apiClient.post(`/approve-leave/${id}`, data);
  return response.data;
};
