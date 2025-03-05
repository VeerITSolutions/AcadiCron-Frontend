import apiClient from "./apiClient";

export const fetchNotificationEcampusCircularData = async (page: any, perPage:  any, id?:  any) => {
  const response = await apiClient.get(`/ecampus-cicular`, {
    params: {
      page,
      perPage,
      id
    },
  });
  return response.data;
};



// Edit a student category by ID
export const createNotificationEcampusCircular = async ( data : any) => {

  const response = await apiClient.post(`/ecampus-cicular`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteNotificationEcampusCircularData = async (id: number) => {
  const response = await apiClient.delete(`/ecampus-cicular/${id}`);
  return response.data;
};



export const editNotificationEcampusCircularData = async (id: number, data: any) => {
  const response = await apiClient.post(`/ecampus-cicular/${id}`, data);
  return response.data;
};
