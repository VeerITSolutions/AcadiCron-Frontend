import apiClient from "./apiClient";


export const fetchStudentMultiClassData = async (selectedClass? :any,
  selectedSection? :any,getselectedSessionId?  : any,
  keyword?:any) => {
  const response = await apiClient.get(`/multi-class`, {
    params: {
      selectedClass,
      selectedSection,
      getselectedSessionId,
      keyword
    },
  });
  return response.data;
};

export const fetchUpdatetMultiClass = async (student_session_id :any) => {
  const response = await apiClient.post(`/update-multi-class`, {
    params: {
      student_session_id
       },
  });
  return response.data;
};
