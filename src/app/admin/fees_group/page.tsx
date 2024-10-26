"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  createFeesGroup,
  deleteFeesGroupData,
  editFeesGroupData,
  fetchStudentFeesGroupData,
} from "@/services/studentFeesGroupService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

const GroupMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    is_active: "no",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentFeesGroupData(
        currentPage + 1,
        rowsPerPage
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
      await deleteFeesGroupData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete the item.");
    }
  };

  const handleEdit = (id: number, type: string, description: string, is_active: string) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      type,
      description,
      is_active,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.type || "N/A",
      student.description || "N/A",
      <div key={student.id}>
        <IconButton
          onClick={() => handleEdit(student.id, student.type, student.description, student.is_active)}
          aria-label="Edit"
        >
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(student.id)} aria-label="delete">
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

      if (isEditing && editCategoryId !== null) {
        result = await editFeesGroupData(
          editCategoryId,
          formData.type,
          formData.description,
        
        );
      } else {
        result = await createFeesGroup(
          formData.type,
          formData.description,
        
        );
      }

      if (result.success) {
        toast.success(isEditing ? "Fees group updated successfully" : "Fees group saved successfully");
        setFormData({
          type: "",
          description: "",
          is_active: "1",
        });
        setIsEditing(false);
        setEditCategoryId(null);
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        const errorMessage = result.message || "An error occurred";
        const errors = result.errors || {};

        toast.error(errorMessage);

        if (errors.type) {
          toast.error(`Type: ${errors.type.join(", ")}`);
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

  const columns = ["Name", "Description", "Actions"];
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
    filter: false, // Disable filter
    viewColumns: false, // Disable view columns button
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      {isEditing ? "Edit Fees Group" : "Add Fees Group"}
    </h3>
  </div>
  <div className="flex flex-col gap-5.5 p-6.5">
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Name
      </label>
      <input
        name="type"
        type="text"
        value={formData.type}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

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

    <div>
      <button
        type="submit"
        className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        onClick={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleSubmit();
        }}
      >
        {isEditing ? "Update" : "Save"}
      </button>
    </div>
  </div>
</div>

        </div>

        <div className="flex flex-col gap-9">
        <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Fees Group List"}
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

export default GroupMaster;
