import apiClient from "./apiClient";

export const fetchRoleData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/role`);
  return response.data;
};


// Delete a student role by ID
export const deleteRoleData = async (id: number) => {
  const response = await apiClient.delete(`/role/${id}`);
  return response.data;
};

// Edit a student role by ID
export const editRoleData = async (id: number, role: string) => {
  const data = { role }; // Create an object with the name field
  const response = await apiClient.post(`/role/${id}`, data);
  return response.data;
};
