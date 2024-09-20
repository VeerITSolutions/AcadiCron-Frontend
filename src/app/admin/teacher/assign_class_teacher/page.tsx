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

import { fetchsectionData } from "@/services/sectionsService"; // Import your section API service
import { fetchClassAssingTeacherData } from "@/services/classesAssingTeacherService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your section API service
import {
  createStaff,
  deleteStaff,
  fetchStaffData,
  editStaffData,
  getStaffbyrole,
} from "@/services/staffService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [teacher, setTeacherData] = useState<Array<Array<any>>>([]);
  const [classes, setClassessData] = useState<Array<Array<any>>>([]);

  const [section, setSections] = useState<Array<Array<any>>>([]);
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
      const result = await fetchClassAssingTeacherData(
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

    try {
      const result = await getStaffbyrole(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setTeacherData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await getClasses(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setClassessData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchsectionData(currentPage + 1, rowsPerPage); // Fetch the section data from API
      setSections(result.data); // Assuming your API returns section data as an array
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch sections", error);
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
      student.class,
      student.section || "N/A",
      student.name || "N/A",

      <div key={student.id}>
        <IconButton
          onClick={() =>
            handleEdit(
              student.id,
              student.class,
              student.section,
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

  const columns = ["Class", "Section", "Class Teacher", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    page: page,
    selectableRows: "none", // Disable row selection
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
                  ? "Edit Assign Class Teacher"
                  : "Assign Class Teacher"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Class <span className="required">*</span>
                    </label>
                    <select
                      id="class_id"
                      name="class_id"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select</option>
                      {classes.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.class}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-5.5 p-6.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Section <span className="required">*</span>
                  </label>
                  <select
                    id="section_id"
                    name="section_id"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {section.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.section}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-5.5 p-6.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Class Teacher<span className="required">*</span>
                    &nbsp;&nbsp;&nbsp;
                  </label>
                  {teacher.map((teachers) => (
                    <label
                      key={teachers.id}
                      className="radio-inline block text-sm font-medium text-black dark:text-white"
                    >
                      <input
                        className="User_radio__Zd0k2"
                        type="checkbox"
                        value={teachers.id}
                        name="class_teacher"
                      />{" "}
                      {`${teachers.name} ${teachers.surname} (${teachers.id})`}
                    </label>
                  ))}
                </div>

                <div>
                  <button type="submit" className="inline-flex rounded-full bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <MUIDataTable
            title={"Class Teacher List"}
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
