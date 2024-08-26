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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const StudentCategories = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [categorynew, setCategorynew] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  // State for modal visibility
  const [open, setOpen] = useState<boolean>(false);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentCategoryData(
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
    setCategorynew(categoryName);
    setOpen(true); // Open the modal
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
  }, [page, rowsPerPage, token]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorynew(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await createCategory(category);
      if (result.success) {
        toast.success("Category saved successfully");
      } else {
        toast.error("Failed to save category");
      }
      setCategory("");
      setIsEditing(false);
      setEditCategoryId(null);
      setOpen(false); // Close the modal
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        // Edit existing category
        const result = await editStudentCategoryData(
          editCategoryId,
          categorynew,
        );
        if (result.success) {
          toast.success("Category updated successfully");
        } else {
          toast.error("Failed to update category");
        }
      } else {
      }
      setCategory("");
      setIsEditing(false);
      setEditCategoryId(null);
      setOpen(false); // Close the modal
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (loading) return <p>Loading...</p>;
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
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Category
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
                </div>
                <div>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <MUIDataTable
            title={"Category List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      {/* Edit Category Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {isEditing ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={categorynew}
            onChange={handleEditCategoryChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
};

export default StudentCategories;
