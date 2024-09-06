"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";

import {
  createFeesMaster,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    fees_group: "",
    fees_type: "",
    due_date: "",
    amount: "",
    fine_type: "",
    percentage: "",
    description: "",
    fine_amount: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentFeesMasterData(
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
      await deleteFeesMasterData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    fees_group_value: string,
    fees_type_value: string,
    due_date_value: string,
    amount_value: string,
    fine_type_value: string,
    percentage_value: string,
    description_value: string,
    fine_amount_value: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      fees_group: fees_group_value,
      fees_type: fees_type_value,
      due_date: due_date_value,
      amount: amount_value,
      fine_type: fine_type_value,
      percentage: percentage_value,
      description: description_value,
      fine_amount: fine_amount_value,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.id,
      student.fees_group || "N/A",
      student.fees_type || "N/A",
      student.due_date || "N/A",
      student.amount || "N/A",
      student.fine_type || "N/A",
      student.percentage || "N/A",
      student.description || "N/A",
      student.fine_amount || "N/A",

      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleEdit(
              student.id,
              student.fees_group,
              student.fees_type,
              student.due_date,
              student.amount,
              student.fine_type,
              student.percentage,
              student.description,
              student.fine_amount,
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
      if (isEditing && editCategoryId !== null) {
        const result = await editFeesMasterData(
          editCategoryId,

          formData.id,
          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          formData.description,
          formData.fine_amount,
        );
        if (result.success) {
          toast.success("Student House updated successfully");
        } else {
          toast.error("Failed to update Student House");
        }
      } else {
        const result = await createFeesMaster(
          formData.id,
          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          formData.description,
          formData.fine_amount,
        );
        if (result.success) {
          toast.success("Student House saved successfully");
        } else {
          toast.error("Failed to save Student House");
        }
      }

      setFormData({
        fees_group: "",
        fees_type: "",
        due_date: "",
        amount: "",
        fine_type: "",
        percentage: "",
        description: "",
        fine_amount: "",
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
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Name<span className="required">*</span></label><input className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" type="text" value="" name="name" /></div>
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
