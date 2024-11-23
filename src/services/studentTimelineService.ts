import apiClient from "./apiClient";

export const fetchStudentTimelineData = async (id: string) => {
  const response = await apiClient.get(`/student-timeline/${id}`);
  return response.data;
};


// Delete a student category by ID
export const deleteStudentTimeline = async (id: number) => {
  const response = await apiClient.delete(`/student-timeline/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentTimeline = async (id: number, data: any) => {

  const response = await apiClient.post(`/student-timeline/${id}`, data);
  return response.data;
};


// Edit a student category by ID
export const createStudentTimeline = async ( data : any) => {

  const response = await apiClient.post(`/student-timeline`, data);
  return response.data;
};
