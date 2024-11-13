"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import Close from "@mui/icons-material/Close"; // Import the Close icon
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import the Flatpickr theme
import "flatpickr/dist/flatpickr.css"; // You can use other themes too
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
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
  "Class",
  "Section",
  "Section Group",
  "Subject",
  "Homework Date",
  "Submission Date",
  "Evaluation Date",
  "Created By",
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
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
 
 
 

  const [keyword, setKeyword] = useState<string>("");
  const [colorMode, setColorMode] = useColorMode();
  const [formData, setFormData] = useState({
    date: "",
    leave_type_id: "",
    leave_from: "",
    leave_to: "",
    reason: "",
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

  const handleDateChange = (selectedDates: any) => {
    setFormData({ ...formData, date: selectedDates[0] });
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
      document_file: null,
    });
    setOpen(true); // Open the modal
  };


  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.class_name || "N/A",
      student.section_name || "N/A",
      student.subject_group_subject_id || "N/A",
      student.subject_name || "N/A",

      student.homework_date || "N/A",
      student.submit_date || "N/A",
      student.evaluation_date || "N/A",
      student.created_by || "N/A",
      "Action",
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
          document_file: null,
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "file" && "files" in event.target
          ? (event.target as HTMLInputElement).files?.[0]
          : value,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
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
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false); // Reset editing state
  };


  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };


  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setKeyword("");
  };


  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);
  
  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (


    <DefaultLayout>

<div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class:
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
            >
              <option value="">Select</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Section:
            <select
              value={selectedSection || ""}
              onChange={handleSectionChange}
              className={`${styles.select} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
              disabled={!selectedClass} // Disable section dropdown if no class is selected
            >
              <option value="">Select</option>
              {section.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search By Keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={`${styles.searchInput} dark:bg-boxdark dark:drop-shadow-none dark:border-strokedark`}
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


      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-[#F8F8F8] shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none ">
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
    className="flex rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90 mr-4"  // Added margin-right for spacing
    onClick={handleClickOpen}
  >
    {editing ? "Edit Homework" : "Add Homework"}
  </button>
</div>

        <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={" Homework List"}
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
        <Dialog
          open={open}
          onClose={handleClose}
          className="dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Homework" : "Add Homework"}
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
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
      {/* Class */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Class <span className="required">*</span>
        </label>
        <select
          name="modal_class_id"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none"
          
        >
          <option value="">Select</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
        </select>
      </div>

      {/* Section */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Section <span className="required">*</span>
        </label>
        <select
          name="modal_section_id"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none">
          <option value="">Select</option>
          {/* You can dynamically populate this based on selected class */}
        </select>
      </div>

      {/* Subject Group */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Subject Group <span className="required">*</span>
        </label>
        <select
          name="modal_subject_group_id"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none">
          <option value="">Select</option>
          {/* Subject groups will be listed here */}
        </select>
      </div>

      {/* Subject */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Subject <span className="required">*</span>
        </label>
        <select
          name="modal_subject_id"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none"
        
        >
          <option value="">Select</option>
          {/* Subject options */}
        </select>
      </div>

      {/* Homework Date */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Homework Date <span className="required">*</span>
        </label>
        <div className="relative">
          <Flatpickr
            options={{
              dateFormat: "m/d/Y",
            }}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none"
          />
        </div>
      </div>

      {/* Submit Date */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Submission Date <span className="required">*</span>
        </label>
        <input
          type="text"
          name="submit_date"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none"
         
        />
      </div>

      {/* Attach Document */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Attach Document
        </label>
        <input
          type="file"
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent"
        
        />
      </div>

      {/* Description */}
      <div className="field mb-3">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Description <span className="required">*</span>
        </label>
        <textarea
          name="description"
          className="form-control w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none"
         
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-full">
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 px-5 text-white"
        >
          Submit
        </button>
      </div>
    </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
