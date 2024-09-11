"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchdeparmentData, createdeparment, deletedeparment, editdeparment } from "@/services/deparmentService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import NoticeForm from "@/components/User/NoticeForm";

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    department_name: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchdeparmentData(currentPage + 1, rowsPerPage);
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
      await deletedeparment(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, department_name_value: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      department_name: department_name_value,
    });
  };

  const formatDepartmentData = (departments: any[]) => {
    return departments.map((department: any) => [
      department.department_name || "N/A",
      <div key={department.id}>
        <IconButton
          onClick={() => handleEdit(department.id, department.department_name)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(department.id)}
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
        const result = await editdeparment(editCategoryId, formData.department_name);
        if (result.success) {
          toast.success("Department updated successfully");
        } else {
          toast.error("Failed to update Department");
        }
      } else {
        const result = await createdeparment(formData.department_name);
        if (result.success) {
          toast.success("Department saved successfully");
        } else {
          toast.error("Failed to save Department");
        }
      }

      // Reset form and state
      setFormData({ department_name: "" });
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

  const columns = ["Department Name", "Action"];
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
       <NoticeForm />
    </DefaultLayout>
  );
};

export default FeesMaster;
