import apiClient from "./apiClient";

export const fetchStudentFeesMasterData = async (page?: number, perPage?: number) => {
  const response = await apiClient.get(`/fees-master`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};

export const fetchPrintFeesByGroupData = async (
  dataFeeMasterId: any,
  dataFeeGroupsFeeTypeId: any,
  dataFeeSessionGroupId: any,
  payload: any,
  deposits: any,
  student_details: any
) => {
  const response = await apiClient.post(`/student-fees-print-by-group`, {
    dataFeeMasterId,
    dataFeeGroupsFeeTypeId,
    dataFeeSessionGroupId,
    payload,
    deposits,
    student_details
  });
  return response.data;
};

export const fetchRestoreFeesByGroupData = async (
  fees_id: any,
  deposits_id: any,

) => {
  const response = await apiClient.post(`/student-fees-restore-by-group`, {
    fees_id,
    deposits_id
  });
  return response.data;
};

export const fetchAddFeesByGroupData = async (
  data: any,

) => {
  const response = await apiClient.post(`/student-fees-add-grp`, {
    data
  });
  return response.data;
};


export const createFeesMasterData = async (
fees_group?:any,
fees_type?:any,
due_date?:any,
amount?:any,
fine_type?:any,
percentage?:any,
descriptiond?: any,
fine_amount?:string

): Promise<any> => {
  try {
    const response = await apiClient.post("/fees-master", {
      fees_group,
      fees_type,
      due_date,
      amount,
      fine_type,
      percentage,
      fine_amount });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Fees");
  }
};


export const createFeesMaster= async (
  fees_group?:any,
  fees_type?:any,
  due_date?:any,
  amount?:any,
  fine_type?:any,
  percentage?:any,
  descriptiond?: any,
  fine_amount?:string

  ): Promise<any> => {
    try {
      const response = await apiClient.post("/fees-master", {
        fees_group,
        fees_type,
        due_date,
        amount,
        fine_type,
        percentage,
        fine_amount });
      return response.data;
    } catch (error) {
      console.error("An error occurred", error);
      throw new Error("Failed to create Fees");
    }
  };
// Delete a student category by ID
export const deleteFeesMasterData = async (id: number) => {
  const response = await apiClient.delete(`/fees-master/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeesMasterData = async (id: number, name: string, description?: string,




fees_type?:string,
due_date?:string,
amount?:string,
fine_type?:string,
percentage?:string,

fine_amount?:string,
) => {
  const data = { name, description }; // Create an object with the name field
  const response = await apiClient.post(`/fees-master/${id}`, data);
  return response.data;
};
