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
import { fetchRoleData } from "@/services/roleService";
import Link from "next/link";
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
import { fetchStaffData } from "@/services/staffService";
import { useLoginDetails } from "@/store/logoStore";

const columns = ["Title", "Date", "Venue", "Action"];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  search: false,
  selectableRows: "none",
  filter: false,
  viewColumns: false,
};

const Events = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);

  const [staffData, setStaffData] = useState<Array<Array<string>>>([]);

  const [roleleavedata, setRoleLeaveData] = useState<Array<Array<string>>>([]);
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

  const [selectedRoleLeave, setSelectedRoleLeave] = useState<
    string | undefined
  >(undefined);
  const [selectedLeaveType, setSelectedLeaveselectedLeaveType] = useState<
    string | undefined
  >(undefined);
  const [selectedStaff, setSelectedStaff] = useState<string | undefined>(
    undefined,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [colorMode, setColorMode] = useColorMode();
  const [formData, setFormData] = useState({
    date: null as Date | null,
    leave_type_id: "",
    leave_from: null as Date | null,
    leave_to: null as Date | null,
    employee_remark: "",
    admin_remark: "",
    status: "",
    document_file: null,
  });
  const [editing, setEditing] = useState(false); // Add state for editing
  const [currentLeaveId, setCurrentLeaveId] = useState<number | null>(null); // ID of the leave being edited
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  const handleDateChange = (selectedDates: Date[], name: string) => {
    if (selectedDates.length > 0) {
      const formattedDate = selectedDates[0].toISOString().split("T")[0]; // Format to YYYY-MM-DD
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedDate, // Update the specific field dynamically
      }));
    }
  };

  const handleEdit = async (id: number, leaveData: any) => {
    setEditing(true);
    setCurrentLeaveId(id);

    try {
      const result = await fetchLeaveData(
        "",
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword,
        id,
      );

      setFormData(result.data[0]);
      setSelectedRoleLeave(result.data[0].leave_type_id);
      setSelectedStaff(result.data[0].staff_id);
      setSelectedLeaveselectedLeaveType(result.data[0].leave_type_id);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    setOpen(true); // Open the modal
  };
  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A"; // Handle null/undefined dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Handle invalid dates
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      date,
    );
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "orange";
      case "approve":
        return "green";
      case "disapprove":
        return "red";
      default:
        return "gray"; // Default for "N/A" or unknown statuses
    }
  };
  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      `${student.name} ${student.surname}` || "N/A",
      student.type || "N/A",
      `${formatDate(student.leave_from)} - ${formatDate(student.leave_to) || "N/A"}`,
      student.leave_days || "N/A",
      formatDate(student.date) || "N/A",

      <span
        key={student.id}
        style={{ color: getStatusColor(student.status), fontWeight: "bold" }}
      >
        {student.status || "N/A"}
      </span>,
      <div key={student.id} className="flex">
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
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );
  useEffect(() => {
    setSelectedSessionId(getselectedSessionId);
  }, []);
  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
    selectedRoleLeave?: string,
  ) => {
    try {
      const resultStaffData = await fetchStaffData(
        currentPage + 1,
        rowsPerPage,
        null,
        selectedSection,
        keyword,
        selectedSessionId,
        selectedRoleLeave,
      );
      setStaffData(resultStaffData.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

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

      /* const roleresult = await fetchRoleData();
      setRoleData(roleresult.data); */

      // const leaveresult = await fetchLeaveData();
      // setRoleLeaveData(leaveresult.data);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSave = async () => {
    if (
      !selectedRoleLeave &&
      !selectedStaff &&
      !formData.leave_from &&
      !formData.leave_to &&
      !formData.status
    ) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }
    try {
      let result;
      if (editing) {
        result = await editLeaveData(
          currentLeaveId,
          selectedRoleLeave,
          selectedStaff,
          selectedLeaveType,
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.employee_remark,
          formData.admin_remark,
          formData.document_file,
          formData.status,
        );
      } else {
        result = await createLeave(
          selectedRoleLeave,
          selectedStaff,
          selectedLeaveType,
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.employee_remark,
          formData.admin_remark,
          formData.document_file,
          formData.status,
        );
      }

      if (result.status == 200) {
        toast.success(
          editing ? "Leave updated successfully" : "Leave applied successfully",
        );
        setFormData({
          date: null as Date | null,

          leave_type_id: "",
          leave_from: null as Date | null,
          leave_to: null as Date | null,
          employee_remark: "",
          admin_remark: "",
          status: "",
          document_file: null,
        });

        setSelectedRoleLeave("");
        setSelectedStaff("");
        setSelectedLeaveselectedLeaveType("");
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      keyword,
      selectedRoleLeave,
    );
  };

  useEffect(() => {
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      keyword,
      selectedRoleLeave,
    );
  }, [
    page,
    rowsPerPage,
    selectedClass,
    selectedSection,
    keyword,
    selectedRoleLeave,
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({
      date: null as Date | null,

      leave_type_id: "",
      leave_from: null as Date | null,
      leave_to: null as Date | null,
      employee_remark: "",
      admin_remark: "",
      status: "",
      document_file: null,
    });

    setSelectedRoleLeave("");
    setSelectedStaff("");
    setSelectedLeaveselectedLeaveType("");
    setOpen(false);
    setEditing(false); // Reset editing state
  };

  const handleStaffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStaff(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoleLeave(event.target.value);
  };

  const handleLeaveType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeaveselectedLeaveType(event.target.value);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-[#F8F8F8] shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none ">
        <div
          className="mb-4 pl-4 pt-4 text-right"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link href="/admin/front/events/create">
            <button
              type="submit"
              className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
              onClick={handleClickOpen}
            >
              <i className="fa fa-plus mr-2" />
              Add
            </button>
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Events"}
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
          </ThemeProvider>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Events;
