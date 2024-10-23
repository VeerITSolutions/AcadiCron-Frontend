import apiClient from "./apiClient";

export const fetchSchSetting = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/schsetting`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
