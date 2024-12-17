import apiClient from "./apiClient";

export const fetchTimeTableData = async (  
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,) => {
  const response = await apiClient.get(`/timetable`, {
    params: {
      selectedClass, 
      selectedSection, 
      selectedSubjectGroup, 
    },
  });
  return response.data;
};


// Edit a student category by ID
export const createTimeTableData = async ( data : any) => {

  const response = await apiClient.post(`/timetable`, data);
  return response.data;
};


// Edit a student category by ID
export const editTimeTableData = async (id: number, data: any) => {

  const response = await apiClient.post(`/timetable/${id}`, data);
  return response.data;
};



// Delete a student category by ID
export const deleteTimeTableData = async (id: number) => {
  const response = await apiClient.delete(`/timetable/${id}`);
  return response.data;
};




