import apiClient from "./apiClient";

export const fetchCertificateData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/certificate`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createCertificate = async (certificate_name: string, certificate_text: String, left_header: string, center_header: string, right_header:string, left_footer: string, center_footer: string, header_height: string, content_height: string,  footer_height: string,  content_width: string, background_image: string ): Promise<any> => {
  try {
    const response = await apiClient.post("/certificate", { certificate_name, certificate_text, left_header, center_header, right_header, left_footer, center_footer, header_height, content_height, footer_height, content_width, background_image });
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
export const editCertificateData = async (id: number, certificate_name: string, certificate_text: String, left_header: string, center_header: string, right_header:string, left_footer: string, center_footer: string, header_height: string, content_height: string, footer_height: string, content_width: string, background_image: string ) => {
  const data = { certificate_name, certificate_text, left_header, center_header, right_header, left_footer, center_footer, header_height, content_height, footer_height, content_width, background_image }; // Create an object with the name field
  const response = await apiClient.put(`/certificate/${id}`, data);
  return response.data;
};
