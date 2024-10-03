"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";

import {
  createDesignation,
  deleteDesignation,
  editDesignation,
  fetchDesignationData,

} from "@/services/designationService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { fetchdeparmentData } from "@/services/deparmentService";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    designation: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchDesignationData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatDepartmentData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDesignation(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, designation_value: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      designation: designation_value,
    });
  };

  const formatDepartmentData = (designations: any[]) => {
    return designations.map((designation: any) => [
      designation.designation || "N/A",
      <div key={designation.id}>
        <IconButton
          onClick={() => handleEdit(designation.id, designation.designation)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(designation.id)}
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
        const result = await editDesignation(editCategoryId, formData.designation);
        if (result.success) {
          toast.success("Designation updated successfully");
        } else {
          toast.error("Failed to update Designation");
        }
      } else {
        const result = await createDesignation(formData.designation);
        if (result.success) {
          toast.success("Designation saved successfully");
        } else {
          toast.error("Failed to save Designation");
        }
      }

      // Reset form and state
      setFormData({ designation: "" });
      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      toast.error("An error occurred");
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

  const columns = ["Designation", "Action"];
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
                {isEditing
                  ? "Edit Add Designation"
                  : "Add Designation"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >

                      <div className="flex flex-col gap-5.5 p-6.5"><div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name<span className="required">*</span></label><input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="text" name="designation"  value={formData.designation}
                      onChange={handleInputChange} /></div>
                      </div>
               
   
 
                <div>
                  <button type="submit" className="">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <MUIDataTable
            title={"Designation List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeesMaster;
