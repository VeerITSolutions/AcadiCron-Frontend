"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";

import {
  createFeesDiscount,
  deleteFeesDiscountData,
  editFeesDiscountData,
  fetchStudentFeesDiscountData,

} from "@/services/studentFeesDiscountService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    amount: "",
    description: "",
    is_active: "no",
  });


  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentFeesDiscountData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeesDiscountData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    name: string,
    code: string,
    amount: string,
    description: string,
    is_active: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      name,
      code,
      amount,
      description,
      is_active,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.name || "N/A",
      student.code || "N/A",
      student.amount || "N/A",


      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleEdit(
              student.id,
              student.name,
              student.code,
              student.amount,
              student.description,
              student.is_active,
            )
          }
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(student.id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let result;

      // Check if we are editing an existing category
      if (isEditing && editCategoryId !== null) {
        result = await editFeesDiscountData(
          editCategoryId,
          formData.name,
          formData.code,
          formData.amount,
          formData.description,
          formData.is_active
        );
      } else {
        result = await createFeesDiscount(
          formData.name,
          formData.code,
          formData.amount,
          formData.description,
          formData.is_active
        );
      }

      // Handle the API response
      if (result.success) {
        toast.success(isEditing ? "Student House updated successfully" : "Student House saved successfully");
        // Reset form data
        setFormData({
          name: "",
          code: "",
          amount: "",
          description: "",
          is_active: "",
        });
        setIsEditing(false);
        setEditCategoryId(null);
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        // Handle errors
        const errorMessage = result.message || "An error occurred";
        const errors = result.errors || {};

        toast.error(errorMessage); // Show the main error message

        // Optionally display individual field errors
        if (errors.name) {
          toast.error(`Name: ${errors.name.join(", ")}`);
        }
        if (errors.code) {
          toast.error(`Code: ${errors.code.join(", ")}`);
        }
        if (errors.amount) {
          toast.error(`Amount: ${errors.amount.join(", ")}`);
        }
        if (errors.description) {
          toast.error(`Description: ${errors.description.join(", ")}`);
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Name", "Discount Code", "Amount", "Actions"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    selectableRows: "none", // Disable row selection
    count: totalCount,
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? "Edit Add Fees Discount"
                  : "Add Fees Discount"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Discount Code
                    </label>
                    <input
                      name="code"
                      type="text"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Amount
                    </label>
                    <input
                      name="amount"
                      type="text"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

       <div className="">
       <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
  <MUIDataTable
    title={"Fees Discount List"}
    data={data}
    columns={columns}
    options={options}
  />
  </ThemeProvider>

</div>

      </div>
    </DefaultLayout>
  );
};

export default FeesMaster;
