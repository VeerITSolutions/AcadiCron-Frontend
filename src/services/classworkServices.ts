import apiClient from "./apiClient";

export const fetchClassWorkData = async (
  page: number,
  perPage: number,
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,
  selectedSubject?: string,
  keyword?: string,
  id?: any
) => {
  const response = await apiClient.get(`/classwork`, {
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

export const fetchClassWorkForStudentData = async (
  page: number,
  perPage: number,
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,
  selectedSubject?: string,
  keyword?: string,
  id?: any,
  student_session_id?: any,
  current_session_id? : any,
) => {
  const response = await apiClient.get(`/classwork-student`, {
    params: {
      page,
      perPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
      id,
      student_session_id,
     current_session_id,
    },
  });
  return response.data;
};
export const fetchSearchClassWorkData = async (
  page: number,
  perPage: number,
  selectedClass?: string,
  selectedSection?: string,
  selectedSubjectGroup?: string,
  selectedSubject?: string,
  keyword?: string,
  id?: any
) => {
  const response = await apiClient.post(`/search-classwork`, {
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


export const createClassWork = async (
  selectedClass2 ?: any,
  selectedSection2 ?: any,
  selectedSubjectGroup2 ?: any,
  selectedSubject2 ?: any,
  homework_date ?: any,
  submit_date ?: any,
  document?: any,
  description?: string,getselectedSessionId?: any): Promise<any> => {
  try {
    const response = await apiClient.post("/classwork", {
      selectedClass2, selectedSection2, selectedSubjectGroup2, selectedSubject2, homework_date, submit_date, document,  description ,session_id: getselectedSessionId});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Home work");
  }
};


export const createClassWorkEvaluvation = async (
  selectedIds ?: any,
  formClassWorkid ?: any): Promise<any> => {
  try {
    const response = await apiClient.post("/classwork-evaluvation", {
      selectedIds, formClassWorkid});
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Class work");
  }
};



// Delete a student category by ID
export const deleteClassWorkData = async (id: number) => {
  const response = await apiClient.delete(`/classwork/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editClassWorkData = async (
  id?: any,
  selectedClass2 ?: any,
  selectedSection2 ?: any,
  selectedSubjectGroup2 ?: any,
  selectedSubject2 ?: any,
  ClassWork_date?: any,
  submit_date?: any,
  document?: any,
  description?: string) => {
  const data = { id, selectedClass2, selectedSection2, selectedSubjectGroup2, selectedSubject2, ClassWork_date, submit_date, document,  description }; // Create an object with the name field
  const response = await apiClient.post(`/classwork/${id}`, data);
  return response.data;
};
