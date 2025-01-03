import apiClient from "./apiClient";

export const fetchHostelData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/hostel`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createHostel = async (data:any): Promise<any> => {
  try {
    const response = await apiClient.post("/hostel", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Hostel");
  }
};



// Delete a student category by ID
export const deleteHostel = async (id: number) => {
  const response = await apiClient.delete(`/hostel/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editHostel = async (id: number, data: any) => {
  // Create an object with the name field
  const response = await apiClient.post(`/hostel/${id}`, data);
  return response.data;
};

