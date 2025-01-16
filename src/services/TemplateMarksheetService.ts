import apiClient from "./apiClient";

export const fetchTemplateMarksheets = async (page?: any, perPage?: any) => {
  const response = await apiClient.get(`/template-marksheets`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createTemplateMarksheets = async (data:any ): Promise<any> => {
  try {
    const response = await apiClient.post("/template-marksheets", data);
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create marksheet");
  }
};


export const viewTemplateMarksheet = async (id :any , idsToGenerate? : any): Promise<any> => {
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

export const viewTemplateMarksheetGenerate = async (id :any ,class_id? : any, data? : any  ): Promise<any> => {
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
export const deleteTemplateMarksheets = async (id: number) => {
  const response = await apiClient.delete(`/template-marksheets/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editTemplateMarksheets = async (id: number, data: any) => {
   // Create an object with the name field
  const response = await apiClient.post(`/template-marksheets/${id}`, data);
  return response.data;
};
