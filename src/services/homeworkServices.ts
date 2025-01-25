import apiClient from "./apiClient";

export const fetchHomeWorkData = async (
  page: number,
  perPage: number,
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,
  selectedSubject?: string,
  keyword?: string,
  id?: any
) => {
  const response = await apiClient.get(`/homework`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
      id,
    },
  });
  return response.data;
};


export const fetchSearchHomeWorkData = async (
  page: number,
  perPage: number,
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,
  selectedSubject?: string,
  keyword?: string,
  id?: any
) => {
  const response = await apiClient.post(`/search-homework`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
      id,
    },
  });
  return response.data;
};


export const createHomeWork = async (
  selectedClass2 ?: any,
  selectedSection2 ?: any,
  selectedSubjectGroup2 ?: any,
  selectedSubject2 ?: any,
  homework_date ?: any,
  submit_date ?: any,
  document?: any,
  description?: string,getselectedSessionId?: any): Promise<any> => {
  try {
    const response = await apiClient.post("/homework", {
      selectedClass2, selectedSection2, selectedSubjectGroup2, selectedSubject2, homework_date, submit_date, document,  description ,session_id: getselectedSessionId});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Home work");
  }
};



// Delete a student category by ID
export const deleteHomeWorkData = async (id: number) => {
  const response = await apiClient.delete(`/homework/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editHomeWorkData = async (
  id?: any,
  selectedClass2 ?: any,
  selectedSection2 ?: any,
  selectedSubjectGroup2 ?: any,
  selectedSubject2 ?: any,
  homework_date?: any,
  submit_date?: any,
  document?: any,
  description?: string) => {
  const data = { id, selectedClass2, selectedSection2, selectedSubjectGroup2, selectedSubject2, homework_date, submit_date, document,  description }; // Create an object with the name field
  const response = await apiClient.post(`/homework/${id}`, data);
  return response.data;
};
