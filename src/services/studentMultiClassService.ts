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

export const fetchUpdatetMultiClass = async (page: number, perPage: number,selectedClass :any,
  selectedSection :any,
  keyword:any) => {
  const response = await apiClient.post(`/update-multi-class`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      keyword
    },
  });
  return response.data;
};
