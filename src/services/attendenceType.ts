import apiClient from "./apiClient";

export const fetchAttendenceTypeData = async (
  selectedClass?: any,
  selectedSection?: any,
  selectedSubjectGroup?: any,
  selectedSessionId?: any,) => {
  const response = await apiClient.get(`/attendence-type`, {
    params: {
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSessionId
    },
  });
  return response.data;
};


// Edit a student category by ID
export const createAttendenceTypeData = async ( data : any) => {

  const response = await apiClient.post(`/attendence-type`, data);
  return response.data;
};


// Edit a student category by ID
export const editAttendenceTypeData = async (id: number, data: any) => {

  const response = await apiClient.post(`/attendence-type/${id}`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteAttendenceTypeData = async (id: number) => {
  const response = await apiClient.delete(`/attendence-type/${id}`);
  return response.data;
};
