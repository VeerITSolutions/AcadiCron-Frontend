import apiClient from "./apiClient";

export const fetchDesignationData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/designation`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createDesignation = async (designation: string): Promise<any> => {
  try {
    const response = await apiClient.post("/designation", { designation });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create deparment");
  }
};



// Delete a student category by ID
export const deleteDesignation = async (id: number) => {
  const response = await apiClient.delete(`/designation/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editDesignation = async (id: number, designation: string) => {
  const data = { designation }; // Create an object with the name field
  const response = await apiClient.post(`/designation/${id}`, data);
  return response.data;
};
