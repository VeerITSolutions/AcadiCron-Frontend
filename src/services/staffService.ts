import apiClient from "./apiClient";

export const fetchStaffData = async (page: number, perPage: number,selectedRole :any,
  selectedSection :any,
  keyword:any, selectedSessionId?:any) => {
  const response = await apiClient.get(`/staff-by-role`, {
    params: {
      page,
      perPage,
      selectedRole,
      selectedSection,
      keyword,
      selectedSessionId
    },
  });
  return response.data;
};



export const fetchStaffSingleData = async (id: string) => {
  const response = await apiClient.get(`/staff`, {
    params: {
      id
    },
  });
  return response.data;
};


// export const createStaff = async (house_name: string, description: string): Promise<any> => {
//   try {
//     const response = await apiClient.post("/staff", { house_name, description });
//     return response.data;
//   } catch (error) {
//     console.error("An error occurred", error);
//     throw new Error("Failed to create student house");
//   }
// };

export const createStaff = async ( data : any) => {

  const response = await apiClient.post(`/staff`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteStaff= async (id: number) => {
  const response = await apiClient.delete(`/staff/${id}`);
  return response.data;
};



export const editStaffData = async (id: number, data: any) => {

  const response = await apiClient.post(`/staff/${id}`, data);
  return response.data;
};



export const getStaffbyrole = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/staff-by-role`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};
