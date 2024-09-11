import apiClient from "./apiClient";

export const fetchNotificationData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/notification`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createNotification = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/notification", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create notification");
  }
};



// Delete a student category by ID
export const deleteNotificationData = async (id: number) => {
  const response = await apiClient.delete(`/notification/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editNotificationData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/notification/${id}`, data);
  return response.data;
};
