import apiClient from "./apiClient";

export const fetchStudentFeesTypeData = async (
  page?: number,
  perPage?: number,
) => {
  const response = await apiClient.get(`/fees-type`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};

export const createFeesType = async (
  type: string,
  code: string,
  description: string,
  is_active: string,
): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-type", {
      type,
      code,
      description,
      is_active,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create fees type");
  }
};

// Delete a student category by ID
export const deleteFeesTypeData = async (id: number) => {
  const response = await apiClient.delete(`/fees-type/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesTypeData = async (
  id: number,
  type: string,
  code: string,
  description: string,
  is_active: string,
) => {
  const data = { type, code, description, is_active }; // Create an object with the name field
  const response = await apiClient.post(`/fees-type/${id}`, data);
  return response.data;
};
