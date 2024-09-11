"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  fetchSubjectData,
  createSubject,
  deleteSubject,
  editSubject,
} from "@/services/subjectsService";
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
    name: "",
    code: "",
    type: "Theory", // Default value
    is_active: "1", // Active status
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchSubjectData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatSubjectData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
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
    type: string,
    is_active: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      name,
      code,
      type,
      is_active,
    });
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name,
      subject.code || "N/A",
      subject.type || "N/A",
      <div key={subject.id}>
        <IconButton
          onClick={() =>
            handleEdit(
              subject.id,
              subject.name,
              subject.code,
              subject.type,
              subject.is_active,
            )
          }
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(subject.id)}
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
        const result = await editSubject(
          editCategoryId,
          formData.name,
          formData.code,
          formData.type,
          formData.is_active,
        );
        if (result.success) {
          toast.success("Subject updated successfully");
        } else {
          toast.error("Failed to update subject");
        }
      } else {
        const result = await createSubject(
          formData.name,
          formData.code,
          formData.type,
          formData.is_active,
        );
        if (result.success) {
          toast.success("Subject created successfully");
        } else {
          toast.error("Failed to create subject");
        }
      }

      // Reset form after successful action
      setFormData({
        name: "",
        code: "",
        type: "Theory",
        is_active: "1",
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

  const columns = ["Subject", "Subject Code", "Subject Type", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
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
                {isEditing ? "Edit Subject" : "Add Subject"}
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
                      Subject Name<span className="required">*</span>
                    </label>
                    <input
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Subject Code
                    </label>
                    <input
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Subject Type
                    </label>
                    <div className="flex gap-5">
                      <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <input
                          type="radio"
                          name="type"
                          value="Theory"
                          checked={formData.type === "Theory"}
                          onChange={handleInputChange}
                        />
                        Theory
                      </label>
                      <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <input
                          type="radio"
                          name="type"
                          value="Practical"
                          checked={formData.type === "Practical"}
                          onChange={handleInputChange}
                        />
                        Practical
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Active Status
                    </label>
                    <input
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      name="is_active"
                      value={formData.is_active}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    className="mt-5 rounded bg-primary px-5 py-2 text-white"
                    type="submit"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <MUIDataTable
            title="Subjects"
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
