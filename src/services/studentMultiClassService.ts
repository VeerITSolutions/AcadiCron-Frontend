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

export const fetchUpdatetMultiClass = async (selectedClass :any,
  selectedSection :any) => {
  const response = await apiClient.post(`/update-multi-class`, {
    params: {
      selectedClass,
      selectedSection
    },
  });
  return response.data;
};
