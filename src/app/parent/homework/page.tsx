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
  createHomeWorkEvaluvation,
  fetchHomeWorkForStudentData,
} from "@/services/homeworkServices";
import { fetchSubjectGroupData } from "@/services/subjectGroupService";
import { fetchSubjectData } from "@/services/subjectsService";
import DOMPurify from "dompurify";
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
import {
  Delete,
  Edit,
  FileDownload,
  PanoramaFishEye,
  SellSharp,
  Visibility,
} from "@mui/icons-material";
import { useLoginDetails } from "@/store/logoStore";
import {
  fetchStudentData,
  fetchStudentHomeworkData,
} from "@/services/studentService";
import { set } from "date-fns";
import { get } from "http";

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
  const getselectedUserData = useLoginDetails((state) => state.userData);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [subjectGroup, setSubjectGroup] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<Array<any>>([]);
  const [formhomeworkdate, setformhomeworkdate] = useState<string | null>(null);
  const [formhomeworkdesc, setformhomeworkdesc] = useState<string | null>(null);
  const [formhomeworkid, setformhomeworkid] = useState<string | null>(null);
  const [formsubmissiondate, setformsubmissiondate] = useState<string | null>(
    null,
  );
  const [formevaluationdate, setformevaluationdate] = useState<string | null>(
    null,
  );
  const [formCreatedBy, setformCreatedBy] = useState<string | null>(null);
  const [formClassName, setformClassName] = useState<string | null>(null);
  const [formSectionName, setformSectionName] = useState<string | null>(null);
  const [formSubjectName, setformSubjectName] = useState<string | null>(null);
  const [formdocument, setformdocument] = useState<string | null>(null);
  const [formDesc, setformDesc] = useState<string | null>(null);
  const [classes2, setClassessData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);
  const [subjectGroup2, setSubjectGroup2] = useState<Array<any>>([]);
  const [subject2, setSubject2] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    getselectedUserData.class_id,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    getselectedUserData.section_id,
  );
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState<
    string | undefined
  >(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const [selectedClass2, setSelectedClass2] = useState<string | undefined>(
    getselectedUserData.class_id,
  );
  const [selectedSection2, setSelectedSection2] = useState<string | undefined>(
    getselectedUserData.section_id,
  );
  const [selectedSubjectGroup2, setSelectedSubjectGroup2] = useState<
    string | undefined
  >(undefined);
  const [selectedSubject2, setSelectedSubject2] = useState<string | undefined>(
    undefined,
  );

  const [keyword, setKeyword] = useState<string>("");
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

    "Subject",
    "Homework Date",
    "Submission Date",
    "Evaluation Date",
    "Status",
    "Action",
  ];
  const sanitizeHtml = (html: any) => DOMPurify.sanitize(html);
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
      keyword,
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
    keyword,
  ]);
  const getselectedSessionId = useLoginDetails(
    (state) => state.selectedSessionId,
  );

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass, selectedSection, selectedSubjectGroup]);

  useEffect(() => {
    fetchClassesAndSections2(); // Fetch classes and sections on initial render
  }, [selectedClass2, selectedSection2, selectedSubjectGroup2]);

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

  const [currentData, setCurrentData] = useState<any>(null);

  useEffect(() => {
    if (currentData) {
      setformhomeworkid(currentData.id);
      setformhomeworkdate(formatDate(currentData.homework_date));
      setformsubmissiondate(formatDate(currentData.submit_date));
      setformhomeworkdesc(currentData.description);
      setformevaluationdate(currentData.evaluation_date);
      setformCreatedBy(
        currentData.staff_name + " " + currentData.staff_surname,
      );

      setformClassName(currentData.class);
      setformSectionName(currentData.section);
      setformSubjectName(currentData.subject_name);
      setformdocument(currentData.document);
      setformDesc(currentData.description);
    }
  }, [currentData]); // Run this effect when `currentData` changes

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
      student.class || "N/A",
      student.section || "N/A",
      student.subject_name || "N/A",
      formatDate(student.homework_date) || "N/A",
      formatDate(student.submit_date) || "N/A",
      formatDate(student.evaluation_date) || "N/A",

      <span
        key={`status-${student.id}`}
        className={
          student.homework_evaluation_id === 0
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {student.homework_evaluation_id === 0 ? "Incomplete" : "Completed"}
      </span>,

      <div key={`action-${student.id}`} className="flex items-center space-x-2">
        <IconButton
          onClick={() => handleClickOpenEvaluate(student)}
          aria-label="Show"
        >
          <Visibility />
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
      const result = await fetchHomeWorkForStudentData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        selectedSubjectGroup,
        selectedSubject,
        keyword,
        "",
        getselectedUserData.student_session_id,
        getselectedSessionId,
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
          getselectedSessionId,
        );

        setSubjectGroup(subjectgroupresult.data);
      }
      if (selectedSubjectGroup) {
        const subjectresult = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup,
          getselectedSessionId,
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClickOpenEvaluate = (data: any) => {
    setEvaluateOpen(true);
    setCurrentData(data);

    setCurrentLeaveId(data.id);
  };
  const handleDownload = (url: string) => {
    try {
      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "");

      // Append the link, trigger click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating the download:", error);
    }
  };
  const handleClose = () => {
    setFormData({
      homework_date: null as Date | null,
      submit_date: null as Date | null,
      description: "",
      evaluation_date: "",
      document: null,
    });

    setCurrentLeaveId(null);

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
          getselectedSessionId,
        );

        setSubjectGroup2(subjectgroupresult.data);
      }
      if (selectedSubjectGroup2) {
        const subjectresult = await fetchSubjectData(
          "",
          "",
          selectedSubjectGroup2,
          getselectedSessionId,
        );
        setSubject2(subjectresult.data);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-[#F8F8F8] shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none ">
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
          open={evaluateOpen}
          onClose={handleClose}
          className="dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                Homework Details
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(formhomeworkdesc),
                    }}
                  ></p>
                </div>

                {/* Homework Details */}
                <div className="w-3/6 p-2">
                  <h2 className="mb-3 font-medium text-black dark:text-white">
                    Summary
                  </h2>
                  <div className="mb-4">
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Homework Date:</strong>{" "}
                      {formhomeworkdate ? formhomeworkdate : "N/A"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Submission Date:</strong>{" "}
                      {formsubmissiondate ? formsubmissiondate : "N/A"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Evaluation Date:</strong>{" "}
                      {formevaluationdate || "Not Set"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Created By:</strong>{" "}
                      {formCreatedBy ? formCreatedBy : "N/A"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Class:</strong>{" "}
                      {formClassName ? formClassName : "N/A"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Section:</strong>{" "}
                      {formSectionName ? formSectionName : "N/A"}
                    </p>
                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Subject:</strong>{" "}
                      {formSubjectName ? formSubjectName : "N/A"}
                    </p>
                    {/*  <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Status:</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(formDesc),
                        }}
                      ></span>
                    </p> */}

                    <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                      <strong>Homework Documents :</strong>{" "}
                      <span
                        onClick={() =>
                          handleDownload(
                            formdocument
                              ? process.env.NEXT_PUBLIC_BASE_URL +
                                  "uploads/homework/download/" +
                                  currentLeaveId +
                                  "/" +
                                  formdocument
                              : "#",
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <FileDownload />
                      </span>
                    </p>
                  </div>
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
