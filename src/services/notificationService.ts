import apiClient from "./apiClient";

export const fetchNotificationData = async (page: any, perPage:  any, id?:  any) => {
  const response = await apiClient.get(`/notification`, {
    params: {
      page,
      perPage,
      id
    },
  });
  return response.data;
};



// Edit a student category by ID
export const createNotification = async ( data : any) => {

  const response = await apiClient.post(`/notification`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteNotificationData = async (id: number) => {
  const response = await apiClient.delete(`/notification/${id}`);
  return response.data;
};



export const editNotificationData = async (id: number, data: any) => {
  const response = await apiClient.post(`/notification/${id}`, data);
  return response.data;
};
