"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  fetchLeaveData,
  createLeave,
  deleteLeaveData,
  editLeaveData,
} from "@/services/leaveService";

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

const columns = [
  "Staff",
  "Leave Type",
  "Leave Date",
  "Days",
  "Apply Date",
  "Status",
  "Action",
];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  selectableRows: "none",
  filter: false,
  viewColumns: false,
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const [formData, setFormData] = useState({
    date: "",
    leave_type_id: "",
    leave_from: "",
    leave_to: "",
    reason: "",
    document_file: null,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const handleDelete = async (id: number) => {
    try {
      await deleteLeaveData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  const handleEdit = (id: number, categoryName: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setCategorynew(categoryName);
    setOpen(true); // Open the modal
  };


  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.name || "N/A",
      student.leave_type_id || "N/A",
      student.leave_from + "-" + student.leave_to || "N/A",
      student.leave_days || "N/A",
      student.date || "N/A",
      student.status || "N/A",
      <div key={student.id}>
      <IconButton
        onClick={() => handleEdit(student.id, student.category)}
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

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchLeaveData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchLeaveTypeData();
      setLeaveTypeData(result.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await createLeave(
        formData.date,
        formData.leave_type_id,
        formData.leave_from,
        formData.leave_to,
        formData.reason,
        formData.document_file
      );
      if (result.success) {
        toast.success("Leave applied successfully");
        setFormData({
          date: "",
          leave_type_id: "",
          leave_from: "",
          leave_to: "",
          reason: "",
          document_file: null,
        });
        setOpen(false); // Close the modal
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        toast.error("Failed to apply leave");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred while applying leave");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, token, selectedClass, selectedSection, keyword]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
        <div
          className="mb-4 pl-4 pt-4 text-right sm:w-3/12 xl:w-2/12"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            className="inline-flex rounded bg-white px-3 py-1 font-medium text-white hover:bg-black hover:text-black sm:px-6 sm:py-2.5"
            onClick={handleClickOpen}
          >
            Apply Leave
          </Button>
        </div>

        <MUIDataTable
          title={"Leaves"}
          data={data}
          className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Apply Leave</h3>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Apply Date
                </label>
                <TextField
                  name="date"
                  type="date"
                  className="w-full"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Available Leave <span className="required">*</span>
                </label>
                <select
                  name="leave_type_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.leave_type_id}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {dataleavetype.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Leave From Date <span className="required">*</span>
                </label>
                <TextField
                  name="leave_from"
                  type="date"
                  className="w-full"
                  value={formData.leave_from}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Leave To Date <span className="required">*</span>
                </label>
                <TextField
                  name="leave_to"
                  type="date"
                  className="w-full"
                  value={formData.leave_to}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Reason
                </label>
                <TextField
                  name="reason"
                  type="text"
                  className="w-full"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach Document
                </label>
                <input
                  className={`form-control mt-2 w-full ${styles["f-13"]}`}
                  type="file"
                  name="document_file"
                  id="document_file"
                  onChange={handleChange}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
