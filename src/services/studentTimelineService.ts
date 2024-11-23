import apiClient from "./apiClient";

export const fetchStudentTimelineData = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any, selectedSessionId?:any) => {
  const response = await apiClient.get(`/student-timeline`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      keyword,
      selectedSessionId
    },
  });
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
