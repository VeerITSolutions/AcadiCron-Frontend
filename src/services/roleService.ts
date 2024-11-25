import apiClient from "./apiClient";

export const fetchRoleData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/role`);
  return response.data;
};


// Delete a student category by ID
export const deleteRoleData = async (id: number) => {
  const response = await apiClient.delete(`/category/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editRoleData = async (id: number, category: string) => {
  const data = { category }; // Create an object with the name field
  const response = await apiClient.post(`/category/${id}`, data);
  return response.data;
};
