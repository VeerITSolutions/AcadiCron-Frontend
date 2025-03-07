import apiClient from "./apiClient";

export const fetchCertificateData = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/certificate`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createCertificate = async (data:any ): Promise<any> => {
  try {
    const response = await apiClient.post("/certificate", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create certificate");
  }
};


export const viewCertificate = async (id :any , idsToGenerate? : any): Promise<any> => {
  try {
    const requestData = {

      idsToGenerate: idsToGenerate
    };
    const response = await apiClient.post(`/certificate-view/${id}`,requestData );
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create certificate");
  }
};

export const viewCertificateGenerate = async (id :any ,class_id? : any, data? : any  ): Promise<any> => {
  try {

    const certificate_id = id;
    const response = await apiClient.post(`/certificate-view-generate/${id}`,{data,class_id,certificate_id } );
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
export const editCertificateData = async (id: number, data: any) => {
   // Create an object with the name field
  const response = await apiClient.post(`/certificate/${id}`, data);
  return response.data;
};
