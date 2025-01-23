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
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import {
  fetchHomeWorkData,
  createHomeWork,
  deleteHomeWorkData,
  editHomeWorkData,
} from "@/services/homeworkServices";
import { fetchSubjectGroupData } from "@/services/subjectGroupService";
import { fetchSubjectData } from "@/services/subjectsService";

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
import { Delete, Edit, PanoramaFishEye, Visibility } from "@mui/icons-material";

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
search: false,
  selectableRows: "none",
  filter: false,
  viewColumns: false,
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [subjectGroup, setSubjectGroup] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<Array<any>>([]);

  const [classes2, setClassessData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);
  const [subjectGroup2, setSubjectGroup2] = useState<Array<any>>([]);
  const [subject2, setSubject2] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<
    string | undefined
  >(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const [selectedClass2, setSelectedClass2] = useState<string | undefined>(
    undefined,
  );  
  const [selectedSection2, setSelectedSection2] = useState<string | undefined>(
    undefined,
  );
  const [selectedSubjectGroup2, setSelectedSubjectGroup2] = useState<
    string | undefined
  >(undefined);
  const [selectedSubject2, setSelectedSubject2] = useState<string | undefined>(
    undefined,
  );
  const [colorMode, setColorMode] = useColorMode();
  
  const [formData, setFormData] = useState({
    homework_date: null as Date | null,
    submit_date: null as Date | null,
    description: "",
    evaluation_date: "",
    document: null,
  });
  const [editing, setEditing] = useState(false); // Add state for editing
  const [currentLeaveId, setCurrentLeaveId] = useState<number | null>(null); // ID of the leave being

  const [open, setOpen] = useState(false);
  const [evaluateOpen, setEvaluateOpen] = useState(false);


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
    search: false,
    selectableRows: "none",
    filter: false,
    viewColumns: false,
  };

  /* use Effect  */

  useEffect(() => {
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
    );
  }, [
    page,
    rowsPerPage,
    selectedClass,
    selectedSection,
    selectedSection2,
    selectedSubjectGroup,
    selectedSubjectGroup2,
    selectedSubject,
  ]);

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  useEffect(() => {
    fetchClassesAndSections2(); // Fetch classes and sections on initial render
  }, [selectedClass2, selectedSection2]);

  /* use effect End  */

  const handleDelete = async (id: number) => {
    try {
      await deleteHomeWorkData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed");
    }
  };

  const handleDateChange = (selectedDates: Date[], name: string) => {
    if (selectedDates.length > 0) {
      const formattedDate = selectedDates[0].toLocaleDateString("en-CA"); // Format to YYYY-MM-DD

      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedDate, // Update the specific field dynamically
      }));
    }
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

  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A"; // Handle null/undefined dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Handle invalid dates
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      date,
    );
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.class_name || "N/A",
      student.section_name || "N/A",
      student.subject_groups_name || "N/A",
      student.subject_name || "N/A",
      // student.homework_date || "N/A",
      formatDate(student.homework_date) || "N/A",
      formatDate(student.submit_date) || "N/A",
      formatDate(student.evaluation_date) || "N/A",
      `${student.staff_name || ""} ${student.staff_surname || ""}` || "N/A",
      <div key={student.id} className="flex items-center space-x-2">
        <IconButton
          onClick={() => handleClickOpenEvaluate(student)}
          aria-label="Show"
        >
          <Visibility />
        </IconButton>
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
    selectedSubjectGroup?: string,
    selectedSubject?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchHomeWorkData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        selectedSubjectGroup,
        selectedSubject,
        keyword,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);

      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      setClassessData2(classesResult.data);

      /* call condtion wise  */
      if (selectedClass && selectedSection) {
        const subjectgroupresult = await fetchSubjectGroupData(
          "",
          "",
          selectedClass,
          selectedSection,
        );

        setSubjectGroup(subjectgroupresult.data);
      }
      if (selectedSubjectGroup) {
        const subjectresult = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup,
        );
        setSubject(subjectresult.data);
      }

      if (selectedSubjectGroup2) {
        const subjectresult2 = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup2,
        );
        setSubject2(subjectresult2.data);
      }

      /* call condtin wise end  */

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      let result;
      if (editing) {
        result = await editHomeWorkData(
          currentLeaveId,
          selectedClass2,
          selectedSection2,
          selectedSubjectGroup2,
          selectedSubject2,
          formData.homework_date,
          formData.submit_date,
          formData.document,
          formData.description,
        );

        fetchData(page, rowsPerPage);
      } else {
        result = await createHomeWork(
          selectedClass2,
          selectedSection2,
          selectedSubjectGroup2,
          selectedSubject2,
          formData.homework_date,
          formData.submit_date,
          formData.document,
          formData.description,
        );
        fetchData(page, rowsPerPage); // Refresh data after submit
      }
      if (result.success) {
        toast.success(
          editing
            ? "Homework updated successfully"
            : "Homework applied successfully",
        );
        setFormData({
          homework_date: null as Date | null,
          submit_date: null as Date | null,
          description: "",
          evaluation_date: "",
          document: null,
        });
        setSelectedClass2("");
        setSelectedSection2("");
        setSelectedSubjectGroup2("");
        setSelectedSubject2("");
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

  const handleEdit = async (id: number, data: any) => {
    setEditing(true);
    setCurrentLeaveId(id);

    try {
      console.log(data);
      setFormData(data);
      setSelectedClass2(data.class_id);
      setSelectedSection2(data.section_id);
      setSelectedSubjectGroup2(data.subject_groups_id);
      setSelectedSubject2(data.subject_id);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    setOpen(true); // Open the modal
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

  const handleSubjectGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubjectGroup(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleSectionChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSection2(event.target.value);
  };

  const handleSubjectGroupChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubjectGroup2(event.target.value);
  };

  const handleSubjectChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubject2(event.target.value);
  };



  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEvaluate = (data: any) => {
    setEvaluateOpen(true);
    console.log(data);
  };

  const handleClose = () => {
    setFormData({
      homework_date: null as Date | null,
      submit_date: null as Date | null,
      description: "",
      evaluation_date: "",
      document: null,
    });

    setSelectedClass2("");
    setSelectedSection2("");
    setSelectedSubjectGroup2("");
    setSelectedSubject2("");
    setOpen(false);
    setEvaluateOpen(false);
    setEditing(false); // Reset editing state
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleClassChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass2(event.target.value);
  };

  const handleRefresh = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSubjectGroup("");
  
  };

  const fetchClassesAndSections = async () => {
    try {
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

  const fetchClassesAndSections2 = async () => {
    try {
      // Fetch sections if a class is selected
      if (selectedClass2) {
        const sectionsResult = await fetchsectionByClassData(selectedClass2);
        setSections2(sectionsResult.data);
      } else {
        setSections2([]); // Clear sections if no class is selected
      }
      if (selectedClass2 && selectedSection2) {
        const subjectgroupresult = await fetchSubjectGroupData(
          "",
          "",
          selectedClass2,
          selectedSection2,
        );

        setSubjectGroup2(subjectgroupresult.data);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const [students, setStudents] = useState([
    { id: 1, name: "Angel Vishwakarma (347)", selected: false },
    { id: 2, name: "Bhakti Idole (346)", selected: false },
    { id: 3, name: "Anaya Dhote (345)", selected: false },
  ]);
  const [evaluationDate, setEvaluationDate] = useState("");

  const handleCheckboxChange = (id: any) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student,
      ),
    );
  };

  const handleSave2 = () => {
    console.log(
      "Selected Students:",
      students.filter((s) => s.selected),
    );
    console.log("Evaluation Date:", evaluationDate);
    // Add your save logic here
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>
            Class
            <select
              value={selectedClass || ""}
              onChange={handleClassChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
            Section
            <select
              value={selectedSection || ""}
              onChange={handleSectionChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={!selectedClass}
            >
              <option value="">Select</option>
              {section.map((sec) => (
                <option key={sec.section_id} value={sec.section_id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Subject Group
            <select
              value={selectedSubjectGroup || ""}
              onChange={handleSubjectGroupChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={!selectedClass || !selectedSection}
            >
              <option value="">Select</option>
              {subjectGroup.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Subject
            <select
              value={selectedSubject || ""}
              onChange={handleSubjectChange}
              className={`${styles.select} rounded-lg border-stroke outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              disabled={
                !selectedClass || !selectedSection || !selectedSubjectGroup
              }
            >
              <option value="">Select</option>
              {subject.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.searchGroup}>
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
            className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]" // Added margin-right for spacing
            onClick={handleClickOpen}
          >
            {editing ? "Edit Homework" : "Add Homework"}
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
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
        )}
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
                    Class:
                  </label>
                  <select
                    value={selectedClass2 || ""}
                    onChange={handleClassChange2}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {classes2.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Section:
                  </label>
                  <select
                    value={selectedSection2 || ""}
                    onChange={handleSectionChange2}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    disabled={!selectedClass2} // Disable section dropdown if no class is selected
                  >
                    <option value="">Select</option>
                    {section2.map((sec) => (
                      <option key={sec.section_id} value={sec.section_id}>
                        {sec.section_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Group */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Subject Group <span className="required">*</span>
                  </label>
                  <select
                    value={selectedSubjectGroup2 || ""}
                    onChange={handleSubjectGroupChange2}
                    className="flatpickr-input w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    disabled={!selectedClass2 || !selectedSection2}
                  >
                    <option value="">Select</option>
                    {subjectGroup2.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Subject <span className="required">*</span>
                  </label>
                  <select
                    value={selectedSubject2}
                    onChange={handleSubjectChange2}
                    className="flatpickr-input w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    disabled={
                      !selectedClass2 ||
                      !selectedSection2 ||
                      !selectedSubjectGroup2
                    }
                  >
                    <option value="">Select</option>
                    {subject2.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Homework Date */}
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Homework Date <span className="required">*</span>{" "}
                  </label>
                  <div className="relative">
                    <Flatpickr
                      value={formData.homework_date}
                      onChange={(selectedDates) =>
                        handleDateChange(selectedDates, "homework_date")
                      }
                      options={{
                        dateFormat: "Y-m-d",
                      }}
                      name="homework_date"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Y-m-d"
                    />
                    <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                          fill="#64748B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Submission Date <span className="required">*</span>
                  </label>
                  <div className="relative">
                    <Flatpickr
                      value={formData.submit_date}
                      onChange={(selectedDates) =>
                        handleDateChange(selectedDates, "submit_date")
                      }
                      options={{
                        dateFormat: "Y-m-d",
                      }}
                      name="submit_date"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Y-m-d"
                    />
                    <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                          fill="#64748B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Attach Document */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attach Document
                  </label>
                  <input
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-normal outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    type="file"
                    accept="image/*"
                    name="document"
                    onChange={handleFileChange}
                    id="file"
                  />
                </div>

                {/* Description */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="col-span-full">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={evaluateOpen}
          onClose={handleClose}
          className="dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                Evaluate Homework
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
              <div className="flex w-full">
                {/* Sidebar */}
                <div className="w-4/6 p-2">
                  <h2 className="mb-3 font-medium text-black dark:text-white">
                    Students List
                  </h2>
                  {students.map((student) => (
                    <label
                      key={student.id}
                      className="mb-2 block flex cursor-pointer items-center space-x-2 text-sm font-medium text-black dark:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={student.selected}
                        onChange={() => handleCheckboxChange(student.id)}
                        className="h-3 w-3"
                      />
                      <span>{student.name}</span>
                    </label>
                  ))}
                </div>

        {/* Homework Details */}
        <div className="w-3/6 p-2">
          <h2 className="font-medium text-black dark:text-white mb-3">Summary</h2>
          <div className="mb-4">
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Homework Date:</strong> 01/11/2025</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Submission Date:</strong> 01/12/2025</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Evaluation Date:</strong> {evaluationDate || "Not Set"}</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Created By:</strong> Priya Tendulkar</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Class:</strong> B.Sc.</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Section:</strong> A</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Subject:</strong> English</p>
            <p className="mb-3 block text-sm font-medium text-black dark:text-white"><strong>Description:</strong> addd</p>
          </div>
          <label className="mb-4 block text-sm font-medium text-black dark:text-white">
            Evaluation Date:
            <input
              type="date"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mt-3"
              value={evaluationDate}
              onChange={(e) => setEvaluationDate(e.target.value)}
            />
          </label>
        </div>
      </div>
      </div>
      {/* Save Button */}
      <div className="col-span-full mt-4">
                  <button
                    onClick={handleSave2}
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    Save
                  </button>
                </div>
   
          </DialogContent>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
