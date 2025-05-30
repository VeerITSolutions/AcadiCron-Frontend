import apiClient from "./apiClient";

export const fetchStudentFeeGroupsFeeTypeData = async (
  page?: number,
  perPage?: number,
) => {
  const response = await apiClient.get(`/fee-groups-feetype`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};

export const createFeeGroupsFeeTypeData = async (
  fees_group?: any,
  fees_type?: any,
  due_date?: any,
  amount?: any,
  fine_type?: any,
  percentage?: any,
  descriptiond?: any,
  fine_amount?: string,
): Promise<any> => {
  try {
    const response = await apiClient.post("/fee-groups-feetype", {
      fees_group,
      fees_type,
      due_date,
      amount,
      fine_type,
      percentage,

      fine_amount,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Fees");
  }
};

export const createFeeGroupsFeeType = async (
  fees_group?: any,
  fees_type?: any,
  due_date?: any,
  amount?: any,
  fine_type?: any,
  percentage?: any,
  descriptiond?: any,
  fine_amount?: string,
): Promise<any> => {
  try {
    const response = await apiClient.post("/fee-groups-feetype", {
      fees_group,
      fees_type,
      due_date,
      amount,
      fine_type,
      percentage,
      fine_amount,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create Fees");
  }
};
// Delete a student category by ID
export const deleteFeeGroupsFeeTypeData = async (id: number) => {
  const response = await apiClient.delete(`/fee-groups-feetype/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editFeeGroupsFeeTypeData = async (
  id: number,
  name: string,
  description?: string,
  fees_type?: string,
  due_date?: string,
  amount?: string,
  fine_type?: string,
  percentage?: string,

  fine_amount?: string,
) => {
  const data = { name, description }; // Create an object with the name field
  const response = await apiClient.post(`/fee-groups-feetype/${id}`, data);
  return response.data;
};
