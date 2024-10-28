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
  "Fees Group",
  "Fees Code",
  "Due Date",
  "Status",
  "Amount (₹)",
  "Payment Id",
  "Mode",
  "Date",
  "Discount (₹)",
  "Fine (₹)",
  "Paid (₹)",
  "Balance (₹)",
  "Action",
];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  selectableRows: "multiple",
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
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const [formData, setFormData] = useState({
    date: "",
    leave_type_id: "",
    leave_from: "",
    leave_to: "",
    reason: "",
    document_file: "",
  });
  const [editing, setEditing] = useState(false); // Add state for editing
  const [currentLeaveId, setCurrentLeaveId] = useState<number | null>(null); // ID of the leave being edited
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken") || "";
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteLeaveData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id: number, leaveData: any) => {
    setEditing(true);
    setCurrentLeaveId(id);
    setFormData({
      date: leaveData.date || "",
      leave_type_id: leaveData.leave_type_id || "",
      leave_from: leaveData.leave_from || "",
      leave_to: leaveData.leave_to || "",
      reason: leaveData.reason || "",
      document_file: "",
    });
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
          onClick={() => handleEdit(student.id, student)}
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
      let result;
      if (editing) {
        result = await editLeaveData(
          currentLeaveId!,
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.reason,
          formData.document_file,
        );
      } else {
        result = await createLeave(
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.reason,
          formData.document_file,
        );
      }
      if (result.success) {
        toast.success(
          editing ? "Leave updated successfully" : "Leave applied successfully",
        );
        setFormData({
          date: "",
          leave_type_id: "",
          leave_from: "",
          leave_to: "",
          reason: "",
          document_file: "",
        });
        setOpen(false); // Close the modal
        setEditing(false); // Reset editing state
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        toast.error("Failed to save leave");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred while saving leave");
    }
  };

  /*const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };*/

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    //setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    //setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    //setPage(0);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setKeyword(event.target.value);
  };

  const handleSearch = () => {
    //setPage(0); // Reset to first page on search
    //fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  };

  useEffect(() => {
    //fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false); // Reset editing state
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
        <div className="border-b border-stroke p-4 dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex items-start">
            <div className="flex w-1/5 items-center justify-center">
              <img
                width="115"
                height="115"
                className="rounded-full"
                src="https://erp.erabesa.co.in/uploads/student_images/default_female.jpg"
                alt="No Image"
              />
            </div>

            <div className="ml-4 w-4/5">
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr>
                    <th className="border-b border-b border-stroke p-4 px-4 py-2 text-left font-semibold dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                      Name
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      Aarohi Dani
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Class Section
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      Class 2 (Bright)
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Father Name
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      Sameer Dani
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Admission No
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      0698
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Mobile Number
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      9970521533
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Roll Number
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white"></td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Category
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      Open
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      RTE
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      <span className="text-red-500 font-bold dark:text-white">
                        No
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="pb-4 pl-4 pt-4 text-right dark:bg-boxdark dark:drop-shadow-none
"
        >
          <div className="flex space-x-4">
            <Button
              variant="contained"
              className="inline-flex rounded-lg bg-white px-3 py-1 font-medium lowercase text-white sm:px-6 sm:py-2.5"
              style={{ textTransform: "capitalize" }}
            >
              Print Selected
            </Button>
            <Button
              variant="contained"
              className="inline-flex rounded-lg bg-white px-3 py-1 font-medium lowercase text-white sm:px-6 sm:py-2.5"
              onClick={handleClickOpen}
              style={{ textTransform: "capitalize" }}
            >
              {editing ? "Edit Leave" : "Collect Selected"}
            </Button>
          </div>
        </div>

        <MUIDataTable
          title={""}
          data={data}
          className={`${styles["miui-box-shadow"]}`}
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
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Leave" : "Collect Fees"}
              </h3>
            </div>
          </DialogTitle>
          <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="grid gap-5.5 p-6.5 dark:bg-boxdark dark:drop-shadow-none">
              <div className="field">
                <label className="mb-3 block text-sm font-medium dark:text-white">
                  Date
                </label>
                <TextField
                  name="date"
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition active:border-primary dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:border-strokedark dark:text-white">
                  {" "}
                  Payment Mode
                </label>
                <label className="mr-4 inline-flex items-center">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="Cash"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2 dark:text-white"> Cash</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="Cheque"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">Cheque</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="DD"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">DD</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="bank_transfer"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">Bank Transfer</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="upi"
                    className="form-radio"
                  />
                  <span className="ml-2 dark:text-white">UPI</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="card"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2 dark:text-white">Card</span>
                </label>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:border-strokedark dark:text-white">
                  Note
                </label>
                <TextField
                  name="note"
                  type="text"
                  /* className="w-full dark:text-white"
                   */ /* value={formData.reason}
                  onChange={handleChange} */
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions className="dark:bg-boxdark dark:drop-shadow-none">
            <Button
              onClick={handleClose}
              variant="contained"
              className="hover:bg-gray-700 inline-flex rounded bg-black px-3 py-1 font-medium text-white hover:text-white sm:px-6 sm:py-2.5"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              className="hover:bg-gray-700 inline-flex rounded bg-black px-3 py-1 font-medium text-white hover:text-white sm:px-6 sm:py-2.5"
            >
              {editing ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
