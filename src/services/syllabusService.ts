import apiClient from "./apiClient";

export const fetchSyllabusHTMLData = async (status: any, date: any,selectedTeacherId ?:any) => {
  const response = await apiClient.post(`/staff-syllabus`, {status, date, selectedTeacherId});
  return response.data;
};



export const createStaff = async ( data : any) => {

  const response = await apiClient.post(`/staff`, data);
  return response.data;
};


export const editStaffData = async (id: any, data: any) => {

  const response = await apiClient.post(`/staff/${id}`, data);
  return response.data;
};

export const deleteStaff= async (id: any) => {
  const response = await apiClient.delete(`/staff/${id}`);
  return response.data;
};
