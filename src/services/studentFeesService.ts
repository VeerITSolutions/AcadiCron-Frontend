import apiClient from "./apiClient";

/* export const fetchStudentFeesData = async (id?: string) => {
  const response = await apiClient.post(`/student-fees`, {
    id
  });
  return response.data;
}; */

export const fetchStudentFeesData = async (id?: string) => {
  const response = await apiClient.get(`/studentfees/1816`);
  return response.data;
};


export const create = async (house_name: string, description?: string
,

fees_group?:string,
fees_type?:string,
due_date?:string,
amount?:string,
fine_type?:string,
percentage?:string,
fine_amount?:string,
): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-master", { house_name, description });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create student fees");
  }
};



// Delete a student category by ID
export const deleteData = async (id: number) => {
  const response = await apiClient.delete(`/fees-master/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editData = async (id: number, house_name: string, description?: string,

fees_type?:string,
due_date?:string,
amount?:string,
fine_type?:string,
percentage?:string,

fine_amount?:string,
) => {
  const data = { house_name, description }; // Create an object with the name field
  const response = await apiClient.post(`/fees-master/${id}`, data);
  return response.data;
};
