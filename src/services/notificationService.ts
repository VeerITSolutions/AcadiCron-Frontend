import apiClient from "./apiClient";

export const fetchNotificationData = async (page: number, perPage: number,selectedClass?: string,
  selectedSection?: string,
  keyword?: string,) => {
  const response = await apiClient.get(`/notification`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createNotification = async (title: string, publish_date: string, date: string, message: string, message_to: string, file: File | null): Promise<any> => {
  try {
    const response = await apiClient.post("/notification", { title, publish_date, date, message,  message_to, file});
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
export const editNotificationData = async (id: number, title: string, publish_date: string, date: string, message: string) => {
  const data = { title, publish_date, date, message  }; // Create an object with the name field
  const response = await apiClient.post(`/notification/${id}`, data);
  return response.data;
};
