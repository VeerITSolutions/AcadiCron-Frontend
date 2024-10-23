import apiClient from "./apiClient";

export const fetchSession = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/session`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
