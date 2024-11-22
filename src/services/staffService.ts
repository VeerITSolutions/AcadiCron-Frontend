import apiClient from "./apiClient";

export const fetchStaffData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/staff`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createStaff = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/staff", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteStaff= async (id: number) => {
  const response = await apiClient.delete(`/staff/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStaffData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/staff/${id}`, data);
  return response.data;
};




export const getStaffbyrole = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/staff-by-role`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
