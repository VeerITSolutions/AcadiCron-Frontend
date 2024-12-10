import apiClient from "./apiClient";

export const fetchclassesData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/classes`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createclasses = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/classes", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create class section");
  }
};

export const createclassesAdd = async (name: any, sections: any): Promise<any> => {
  try {
    const response = await apiClient.post("/classes-add", { name, sections });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create class section");
  }
};



// Delete a student category by ID
export const deleteclasses = async (id: number) => {
  const response = await apiClient.delete(`/classes/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editclasses = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/classes/${id}`, data);
  return response.data;
};


export const getClasses = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/get-classes`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
