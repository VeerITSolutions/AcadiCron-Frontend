"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

import {
  createFeesMasterData,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";
import { fetchStudentFeesGroupData } from "@/services/studentFeesGroupService";

import { fetchStudentFeesTypeData } from "@/services/studentFeesTypeService";
import { fetchStudentFeesSeesionGroupData } from "@/services/studentFeesSessionGroupService";

import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [datafeesgroupdata, setFessGroupData] = useState<Array<Array<any>>>([]);
  const [datafesstypedata, setFessTypeData] = useState<Array<Array<any>>>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

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

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentFeesSeesionGroupData(
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
      const result = await fetchStudentFeesSeesionGroupData(
        currentPage + 1,
        rowsPerPage,
      );

      setFessGroupData(result.data);
      console.log("datafeesgroupdata", datafeesgroupdata);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchStudentFeesTypeData(
        currentPage + 1,
        rowsPerPage,
      );

      setFessTypeData(result.data);
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
      student.fees_group_name,
      student.fees_group_name || "N/A",

      <div key={student.id} className="flex items-center space-x-2">
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

          formData.description,
          formData.description,
        );
        if (result.success) {
          toast.success("Student House updated successfully");
        } else {
          toast.error("Failed to update Student House");
        }
      } else {
        const result = await createFeesMasterData(
          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
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

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = ["Fees Group", "Fees Code", "Actions"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    selectableRows: "none", // Disable row selection
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  const handleCancel = () => {
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
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? "Edit Add Fees Master : 2024-25"
                  : "Add Fees Master : 2024-25"}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fees Group *
                  </label>
                  <select
                    name="fees_group"
                    value={formData.fees_group}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {datafeesgroupdata.map((group: any) => (
                      <option key={group.id} value={group.id}>
                        {group.fees_group_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fees Type *
                  </label>
                  <select
                    name="fees_type"
                    value={formData.fees_type}
                    onChange={handleSelectChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {datafesstypedata.map((group: any) => (
                      <option key={group.id} value={group.id}>
                        {group.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Due Date
                  </label>
                  <input
                    name="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Amount *
                  </label>
                  <input
                    name="amount"
                    type="text"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fine Type
                  </label>
                  <div className="flex gap-5">
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input type="radio" name="none" value="none" /> None
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        type="radio"
                        name="percentage"
                        value="percentage"
                      />{" "}
                      Percentage
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input type="radio" name="fix_amount" value="fix" /> Fix
                      Amount
                    </label>
                  </div>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Percentage *
                  </label>
                  <input
                    name="percentage"
                    type="text"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fine Amount *
                  </label>
                  <input
                    name="fine_amount"
                    type="text"
                    value={formData.fine_amount}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Add Fees Master : 2024-25"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeesMaster;
