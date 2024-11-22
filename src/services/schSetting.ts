import apiClient from "./apiClient";

export const fetchSchSetting = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/schsetting`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const editSchSetting = async (data: any) => {

  const response = await apiClient.post(`/schsetting/1`, data);
  return response.data;
};


export const createSchSetting = async ( data : any) => {

  const response = await apiClient.post(`/schsetting`, data);
  return response.data;
};
