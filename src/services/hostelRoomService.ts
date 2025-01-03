import apiClient from "./apiClient";

export const fetchHostelRoomData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/hostel-room`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createHostelRoom = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/hostel-room", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Hostel");
  }
};



// Delete a student category by ID
export const deleteHostelRoom = async (id: number) => {
  const response = await apiClient.delete(`/hostel-room/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editHostelRoom = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/hostel-room/${id}`, data);
  return response.data;
};

