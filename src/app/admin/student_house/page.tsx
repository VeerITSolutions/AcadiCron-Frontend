"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  fetchStudentHouseData,
  createStudentHouse,
  deleteStudentHouseData,
  editStudentHouseData,
} from "@/services/studentHouseService";

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
import Loader from "@/components/common/Loader";
import { ThemeProvider } from "@emotion/react";

import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

const StudentHouse = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number | null>(0);
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [namenew, setNamenew] = useState<string>("");
  const [descriptionnew, setDescriptionnew] = useState<string>("");
  const [colorMode, setColorMode] = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  // State for modal visibility
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentHouseData(currentPage + 1, rowsPerPage);
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
      await deleteStudentHouseData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    namevalue: string,
    descriptionvalue: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setNamenew(namevalue);
    setDescriptionnew(descriptionvalue);
    setOpen(true); // Open the modal
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.house_name || "N/A",
      student.description || "N/A",
      student.id,
      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleEdit(student.id, student.house_name, student.description)
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
  }, [page, rowsPerPage]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamenew(e.target.value);
  };

  const handleEditDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescriptionnew(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await createStudentHouse(name, description);
      if (result.success) {
        toast.success("Student House saved successfully");
      } else {
        toast.error("Failed to save category");
      }

      setName("");
      setDescription("");
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
        const result = await editStudentHouseData(
          editCategoryId,
          namenew,
          descriptionnew,
        );
        if (result.success) {
          toast.success("Student House updated successfully");
        } else {
          toast.error("Failed to update Student House");
        }
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Name", "Description", "Student House Id", "Actions"];
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
      Add Student House
    </h3>
  </div>
  <div className="p-6.5">
    <div className="flex flex-col gap-5.5">
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Name
        </label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
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
          value={description}
          onChange={handleDescriptionChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
    <div className="mt-6 flex">
      <button
        type="button"
        className="rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  </div>
</div>

        </div>

        <div className="flex flex-col gap-9">
          <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Student House List"}
              data={data}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>

      {/* Modal for Editing */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Student House</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={namenew}
            onChange={handleEditNameChange}
            fullWidth
          />
          <TextField
            label="Description"
            value={descriptionnew}
            onChange={handleEditDescriptionChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
};

export default StudentHouse;
