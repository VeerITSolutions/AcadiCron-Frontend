"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchStudentCategoryData } from "@/services/studentCategoryService";
import { createCategory } from "@/services/categoryService";
import {
  deleteStudentCategoryData,
  editStudentCategoryData,
} from "@/services/studentCategoryService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

const StudentCategories = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentCategoryData(currentPage + 1, rowsPerPage);
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
      await deleteStudentCategoryData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, categoryName: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setCategory(categoryName); // Load the selected category name into the input
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.category || "N/A",
      student.id,
      <div key={student.id}>
        <IconButton
          onClick={() => handleEdit(student.id, student.category)}
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
  }, [page, rowsPerPage]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        // Editing an existing category
        const result = await editStudentCategoryData(editCategoryId, category);
        if (result.success) {
          toast.success("Category updated successfully");
        } else {
          toast.error("Failed to update category");
        }
      } else {
        // Creating a new category
        const result = await createCategory(category);
        if (result.success) {
          toast.success("Category saved successfully");
        } else {
          toast.error("Failed to save category");
        }
      }
      setCategory("");
      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    setCategory(""); // Clear the input field
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

  const columns = ["Category", "Category Id", "Actions"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Category" : "Create Category"}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update" : "Save"}
                </button>
                {isEditing && (
                  <button
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Category List"}
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

export default StudentCategories;
