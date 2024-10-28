"use client"; // Add this at the top of the file
import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";

import {
  createFeesMaster,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";

import {
  fetchsectionData,
  createsection,
  deletesection,
  editsection,
} from "@/services/sectionsService";

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
    fees_group: "",
    section_name: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchsectionData(currentPage + 1, rowsPerPage);
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
      await deletesection(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    fees_group_value: string,
    section_name: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    // Pre-fill the form with the selected section's data
    setFormData({
      fees_group: fees_group_value,
      section_name: section_name,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.section,

      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleEdit(student.id, student.fees_group, student.section)
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
      if (isEditing && editCategoryId !== null) {
        const result = await editsection(
          editCategoryId,
          formData.section_name,
          formData.fees_group,
        );
        if (result.success) {
          toast.success("Section updated successfully");
        } else {
          toast.error("Failed to update Section");
        }
      } else {
        const result = await createsection(
          formData.section_name,
          formData.fees_group,
        );
        if (result.success) {
          toast.success("Section saved successfully");
        } else {
          toast.error("Failed to save Section");
        }
      }

      setFormData({
        fees_group: "",
        section_name: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
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

  const columns = ["Section", "Action"];
  const options = {
    filterType: false,
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    selectableRows: "none", // Disable row selection
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
      {isEditing ? "Edit Section" : "Add Section"}
    </h3>
  </div>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <div className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Section Name<span className="required">*</span>
        </label>
        <input
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          type="text"
          name="section_name"
          value={formData.section_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </form>
</div>

        </div>

        <div className="flex flex-col gap-9">
        <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Section List"}
            data={data}
            columns={columns}
            options={options}
          />
          </ThemeProvider>
        </div>
      </div>
    </DefaultLayout>
  );
=======
const staffidcard = () => {
  return <>Hello</>;
>>>>>>> aed60f00f072212c3627c639b7b696f157eb6155
};

export default staffidcard;
