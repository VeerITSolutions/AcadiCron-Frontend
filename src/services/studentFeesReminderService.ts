import apiClient from "./apiClient";

export const fetchStudentFeesReminderData = async (page: number, perPage: number,selectedClass? : string,
  selectedSection? : string,
  keyword? : string) => {
  const response = await apiClient.get(`/fees-remainder`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createFeesReminder = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-remainder",data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student house");
  }
};



// Delete a student category by ID
export const deleteFeesReminder = async (id: number) => {
  const response = await apiClient.delete(`/fees-remainder/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesReminder = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/fees-remainder/${id}`, data);
  return response.data;
};
