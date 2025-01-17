import apiClient from "./apiClient";

export const fetchAdmitCard = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/admit-card`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createAdmitCard = async (data:any ): Promise<any> => {
  try {
    const response = await apiClient.post("/admit-card", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create admitcard");
  }
};


export const viewAdmitCard = async (id :any , idsToGenerate? : any): Promise<any> => {
  try {
    const requestData = {

      idsToGenerate: idsToGenerate
    };
    const response = await apiClient.post(`/admit-card-view/${id}`,requestData );
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create admitcard");
  }
};



// Delete a student category by ID
export const deleteAdmitCard = async (id: number) => {
  const response = await apiClient.delete(`/admit-card/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editAdmitCard = async (id: number, data: any) => {
   // Create an object with the name field
  const response = await apiClient.post(`/admit-card/${id}`, data);
  return response.data;
};
