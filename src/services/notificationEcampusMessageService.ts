import apiClient from "./apiClient";

export const fetchNotificationEcampusMessageData = async (page: any, perPage:  any, id?:  any) => {
  const response = await apiClient.get(`/ecampus-message`, {
    params: {
      page,
      perPage,
      id
    },
  });
  return response.data;
};



// Edit a student category by ID
export const createNotificationEcampusMessage = async ( data : any) => {

  const response = await apiClient.post(`/ecampus-message`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteNotificationEcampusMessageData = async (id: number) => {
  const response = await apiClient.delete(`/ecampus-message/${id}`);
  return response.data;
};



export const editNotificationEcampusMessageData = async (id: number, data: any) => {
  const response = await apiClient.post(`/ecampus-message/${id}`, data);
  return response.data;
};
