"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import Close from "@mui/icons-material/Close"; // Import the Close icon
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import the Flatpickr theme
import "flatpickr/dist/flatpickr.css"; // You can use other themes too

import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { fetchLeaveTypeData } from "@/services/leaveTypeService";
import { fetchStaffData } from "@/services/staffService";
import { useLoginDetails } from "@/store/logoStore";
import {
  fetchItemIssue,
  createItemIssue,
  deleteItemIssue,
  editItemIssue,
} from "@/services/ItemIssueService";

const IssueItem = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<Array<any>>([]);
  const [ItemData, setItemData] = useState<Array<any>>([]);
  const [supplierData, setSupplierData] = useState<Array<any>>([]);
  const [storeData, setStoreData] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  const [editing, setEditing] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A

  const [formData, setFormData] = useState({
    issue_type: "",
    issue_to: "",
    issue_by: "",
    issue_date: "",
    return_date: "",
    item_category_id: "",
    item_id: "",
    quantity: "",
    note: "",
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchItemIssue(currentPage + 1, rowsPerPage);

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItemIssue(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      issue_type: subject?.issue_type || "",
      issue_to: subject?.issue_to || "",
      issue_by: subject?.issue_by || "",
      issue_date: subject?.issue_date || "",
      return_date: subject?.return_date || "",
      item_category_id: subject?.item_category_id || "",
      item_id: subject?.item_id || "",
      quantity: subject?.quantity || "",
      note: subject?.note || "",
    });
  };

  const handleCancel = () => {
    setFormData({
      issue_type: "",
      issue_to: "",
      issue_by: "",
      issue_date: "",
      return_date: "",
      item_category_id: "",
      item_id: "",
      quantity: "",
      note: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    if (file && name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // Dynamically set the file in formData using the input's name attribute
      }));
    }
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.issue_type || "N/A",
      subject.issue_to || "N/A",
      subject.issue_by || "N/A",
      subject.issue_date || "N/A",
      subject.return_date || "N/A",
      subject.item_category_id || "N/A",
      subject.item_id || "N/A",
      subject.quantity || "N/A",
      subject.note || "N/A",
      <div key={subject.id} className="flex">
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
  }, [page, rowsPerPage]);

  useEffect(() => {
    const savedSession = localStorage.getItem("selectedSessionId");
    if (savedSession) {
      setSavedSession(savedSession);
      // Use this value in your logic
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editItemIssue(editCategoryId, formData);
        if (result.success) {
          toast.success("Updated successfully");
        } else {
          toast.error("Failed to update");
        }
      } else {
        const result = await createItemIssue(formData);

        setFormData({
          issue_type: "",
          issue_to: "",
          issue_by: "",
          issue_date: "",
          return_date: "",
          item_category_id: "",
          item_id: "",
          quantity: "",
          note: "",
        });

        setSelectedClass("");
        setSelectedSection([]);
        setSelectedSubject([]);

        if (result.success) {
          toast.success("Created successfully");
        } else {
          toast.error("Failed to create expenses");
        }
      }
      // Reset form after successful action
      setFormData({
        issue_type: "",
        issue_to: "",
        issue_by: "",
        issue_date: "",
        return_date: "",
        item_category_id: "",
        item_id: "",
        quantity: "",
        note: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    // Clear the input field
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // For regular inputs like text or selects
    }));
  };

  const handleSave = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editItemIssue(editCategoryId, formData);
        if (result.success) {
          toast.success("Subject group updated successfully");
        } else {
          toast.error("Failed to update subject group");
        }
      } else {
        const result = await createItemIssue(formData);

        setFormData({
          issue_type: "",
          issue_to: "",
          issue_by: "",
          issue_date: "",
          return_date: "",
          item_category_id: "",
          item_id: "",
          quantity: "",
          note: "",
        });

        setSelectedClass("");
        setSelectedSection([]);
        setSelectedSubject([]);

        if (result.success) {
          toast.success("Subject group created successfully");
        } else {
          toast.error("Failed to create subject group");
        }
      }
      // Reset form after successful action
      setFormData({
        issue_type: "",
        issue_to: "",
        issue_by: "",
        issue_date: "",
        return_date: "",
        item_category_id: "",
        item_id: "",
        quantity: "",
        note: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const columns = [
    "Item",
    "Item Category",
    "Issue - Return",
    "Issue To",
    "Issued By",
    "Quantity",
    "Status",
    "Action",
  ];

  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    page,
    rowsPerPage,
    selectableRows: "none", // Disable row selection

    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  // const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setKeyword(event.target.value);
  // };

  const handleSearch = () => {
    setPage(0);
    fetchData(page, rowsPerPage);
  };
  const handleRefresh = () => {
    setSelectedClass("");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({
      issue_type: "",
      issue_to: "",
      issue_by: "",
      issue_date: "",
      return_date: "",
      item_category_id: "",
      item_id: "",
      quantity: "",
      note: "",
    });
  };

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Search Type:
            <select
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="">Select</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_month">Last 3 Months</option>
              <option value="last_6_month">Last 6 Months</option>
              <option value="last_12_month">Last 12 Months</option>
              <option value="this_year">This Year</option>
              <option value="last_year">Last Year</option>
              <option value="period">Period</option>
            </select>
          </label>

          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search By Keyword"
              // value={keyword}
              // onChange={handleKeywordChange}
              className={`${styles.searchInput} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
            <button onClick={handleRefresh} className={styles.searchButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <div
        className="mb-4 pl-4 pt-4 text-right"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
          onClick={handleClickOpen}
        >
          {editing ? "Edit Issue Item" : "Add Issue Item"}
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Issue Item List"}
            data={data}
            columns={columns}
            options={{
              ...options,
              count: totalCount,
              page: page,
              rowsPerPage: rowsPerPage,
              onChangePage: handlePageChange,
              onChangeRowsPerPage: handleRowsPerPageChange,
            }}
          />
        </ThemeProvider>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        className="dark:bg-boxdark dark:drop-shadow-none"
      >
        <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-black dark:text-white">
              {editing ? "Edit Exam" : "Exam"}
            </h3>
            <IconButton
              onClick={handleClose}
              className="text-black dark:text-white"
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="grid gap-5.5 p-6.5">
              <div className="field">
                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    className="is_quiz"
                    value="1"
                    name="is_quiz"
                  />
                  Quiz
                </label>
                <p className="help-block dark:text-white">
                  In quiz result will be display to student immediately just
                  after exam submission (descriptive question type will be
                  disabled).
                </p>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Exam Title <span className="required">*</span>{" "}
                </label>
                <input
                  value=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Exam From <span className="required">*</span>{" "}
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Exam To <span className="required">*</span>{" "}
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Auto Result Publish Date
                  <span className="required">*</span>{" "}
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Time Duration <span className="required">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="time"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attempt <span className="required">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Passing Percentage <span className="required">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  value=""
                  onChange={handleInputChange}
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white ">
                  <input
                    type="checkbox"
                    className="is_active"
                    name="is_active"
                    value="1"
                  />
                  Publish Exam{" "}
                </label>

                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    className="publish_result"
                    name="publish_result"
                    value="1"
                  />
                  Publish Result{" "}
                </label>

                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    className="is_neg_marking"
                    name="is_neg_marking"
                    value="1"
                  />
                  Negative Marking{" "}
                </label>

                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    className="is_marks_display"
                    name="is_marks_display"
                    value="1"
                  />
                  Display marks in Exam{" "}
                </label>

                <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    type="checkbox"
                    className="is_random_question"
                    name="is_random_question"
                    value="1"
                  />
                  Random Question Order{" "}
                </label>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description <span className="required">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="col-span-full">
                <button
                  onClick={handleSave}
                  className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DefaultLayout>
  );
};

export default IssueItem;
