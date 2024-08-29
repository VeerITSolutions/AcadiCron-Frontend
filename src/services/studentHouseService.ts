import apiClient from "./apiClient";

export const fetchStudentHouseData = async (page: number, perPage: number) => {
  const response = await apiClient.get(`/schoolhouse`, {
    params: {
      page,
      perPage,
    },
  });
  return response.data;
};


export const createStudentHouse= async (category: string): Promise<any> => {
  try {
    const response = await apiClient.post("/schoolhouse", { category });
    return response.data;
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Failed to create category");
  }
};



// Delete a student category by ID
export const deleteStudentHouseData = async (id: number) => {
  const response = await apiClient.delete(`/schoolhouse/${id}`);
  return response.data;
};

// Edit a student category by ID
export const editStudentHouseData = async (id: number, category: string) => {
  const data = { category }; // Create an object with the name field
  const response = await apiClient.put(`/schoolhouse/${id}`, data);
  return response.data;
};
