import apiClient from "./apiClient";

export const fetchCertificateData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/certificate`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createCertificate = async (house_name: string, description: string): Promise<any> => {
  try {
    const response = await apiClient.post("/certificate", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create certificate");
  }
};



// Delete a student category by ID
export const deleteCertificateData = async (id: number) => {
  const response = await apiClient.delete(`/certificate/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editCertificateData = async (id: number, house_name: string, description: string) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.put(`/certificate/${id}`, data);
  return response.data;
};
