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
import {
  fetchStudentFeesSeesionByGroupData,
  fetchStudentFeesSeesionGroupData,
} from "@/services/studentFeesSessionGroupService";

import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { useInitializeLoginDetails, useLoginDetails } from "@/store/logoStore";
import FeeGroupSelect from "@/components/DynamicSelect";
import DynamicSelect from "@/components/DynamicSelect";
import { count } from "console";
import {
  createFeeGroupsFeeTypeData,
  deleteFeeGroupsFeeTypeData,
  editFeeGroupsFeeTypeData,
} from "@/services/studentFeeGroupsFeeType";
import { useRouter } from "next/navigation";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [datafeesgroupdata, setFessGroupData] = useState<Array<Array<any>>>([]);
  const [datafesstypedata, setFessTypeData] = useState<Array<Array<any>>>([]);
  const [selectedFeeGroup, setSelectedFeeGroup] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  useInitializeLoginDetails();

  const sessionName = useLoginDetails((state) => state.selectedSessionName);
  const selectedSessionId = useLoginDetails((state) => state.selectedSessionId);

  const [formData, setFormData] = useState({
    fees_group: "",
    fees_type: "",
    due_date: "",
    amount: "",
    fine_type: "none",
    percentage: "",
    description: "",
    fine_amount: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentFeesSeesionByGroupData(
        currentPage + 1,
        rowsPerPage,
        "",
        selectedSessionId,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchStudentFeesSeesionGroupData();

      setFessGroupData(result.data);
      console.log("datafeesgroupdata", datafeesgroupdata);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchStudentFeesTypeData();

      setFessTypeData(result.data);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      await deleteFeeGroupsFeeTypeData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleAssign = async (id: number) => {
    //want to redisng to assing page
    router.push(`/admin/fees_master/assign/${id}`);
  };

  const handleEdit = (
    id: number,
    fees_group_id: number,
    fees_type_id: number,
    due_date_value: any,
    amount_value: any,
    fine_type_value: any,
    percentage_value: any,
    fine_amount_value: any,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      fees_group: String(fees_group_id), // ✅ Only set the ID as a string
      fees_type: String(fees_type_id),
      due_date: due_date_value,
      amount: amount_value,
      fine_type: fine_type_value,
      percentage: percentage_value,
      description: "",
      fine_amount: fine_amount_value,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.group_name,

      // Render feetypes_html safely inside a <ul>

      <div
        key={`feetypes-${student.id}`}
        dangerouslySetInnerHTML={{ __html: student.feetypes_html }}
        className="ml-4 list-disc"
      />,

      // Action buttons
      <div
        key={`actions-${student.id}`}
        className="flex items-center space-x-2"
      >
        <IconButton
          onClick={() =>
            handleEdit(
              student.id,
              student.fee_groups_id,
              student.feetype_id,
              student.due_date,
              student.amount,
              student.fine_type,
              student.fine_percentage,

              student.fine_amount,
            )
          }
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleAssign(student.id)}
          aria-label="delete"
        >
          <Delete />
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
        if (formData.fine_amount === "" && formData.fine_type !== "none") {
          toast.error("Fine amount is required when fine type is not 'none'");
          return;
        }
        const result = await editFeeGroupsFeeTypeData(
          editCategoryId,

          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          "",
          formData.fine_amount,
          selectedSessionId,
        );
        if (result.success) {
          toast.success("updated successfully");
        } else {
          toast.error("Failed to update ");
        }
      } else {
        const result = await createFeeGroupsFeeTypeData(
          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          "",
          formData.fine_amount,
          selectedSessionId,
        );

        if (result.success) {
          toast.success(" saved successfully");
        } else {
          toast.error("Failed to save ");
        }
      }

      setFormData({
        fees_group: "",
        fees_type: "",
        due_date: "",
        amount: "",
        fine_type: "none",
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

  /* new  */

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = ["Fees Group", "Fees Code", "Actions"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    selectableRows: "none", // Disable row selection
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button

    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
  };

  const handleCancel = () => {
    setFormData({
      fees_group: "",
      fees_type: "",
      due_date: "",
      amount: "",
      fine_type: "none",
      percentage: "",
      description: "",
      fine_amount: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  useEffect(() => {
    calculateFine();
  }, [formData.amount, formData.percentage, formData.amount]);

  const calculateFine = () => {
    const amt = parseFloat(formData.amount);
    const perc = parseFloat(formData.percentage);

    if (formData.fine_type === "percentage") {
      if (!isNaN(amt) && !isNaN(perc)) {
        const fine = ((amt * perc) / 100).toFixed(2);
        setFormData((prev) => ({
          ...prev,
          fine_amount: fine,
        }));
      }
    } else if (formData.fine_type === "fix") {
      // Leave fine_amount as it is; user inputs manually
    } else {
      setFormData((prev) => ({
        ...prev,
        fine_amount: "",
      }));
    }
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? `Edit Fees Master : ${sessionName}`
                  : `Add Fees Master : ${sessionName}`}
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
                  <DynamicSelect
                    name="fees_group"
                    value={formData.fees_group}
                    onChange={handleInputChange}
                    apiEndpoint="/fees-group"
                    isDark={themType === "dark" ? true : false} // or false for light theme
                  />
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
                    type="number"
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
                      <input
                        type="radio"
                        name="fine_type"
                        value="none"
                        checked={formData.fine_type === "none"}
                        onChange={handleInputChange}
                      />{" "}
                      None
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        type="radio"
                        name="fine_type"
                        value="percentage"
                        checked={formData.fine_type === "percentage"}
                        onChange={handleInputChange}
                      />{" "}
                      Percentage
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        type="radio"
                        name="fine_type"
                        value="fix"
                        checked={formData.fine_type === "fix"}
                        onChange={handleInputChange}
                      />{" "}
                      Fix Amount
                    </label>
                  </div>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Percentage *
                  </label>
                  <input
                    name="percentage"
                    type="number"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    disabled={formData.fine_type !== "percentage"} // 🔒 Disable when not percentage
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formData.fine_type !== "percentage"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  />
                </div>

                {/* Fine Amount Input: Only enabled when fine_type is "fix" */}
                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Fine Amount *
                  </label>
                  <input
                    name="fine_amount"
                    type="number"
                    value={formData.fine_amount}
                    onChange={handleInputChange}
                    disabled={formData.fine_type === "percentage"} // 🔒 Disable when auto-calculated
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      formData.fine_type === "percentage"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
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
                title={`Fees Master List : ${sessionName}`}
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
