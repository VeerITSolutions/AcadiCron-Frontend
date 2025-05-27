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
  PanoramaFishEye,
  PlusOne,
  PostAdd,
  RateReview,
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
import {
  editTeacherReviewData,
  fetchTeacherReviewData,
  fetchTeacherReviewGetData,
} from "@/services/teacherReviewService";

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
  const [formhomeworkdate, setformhomeworkdate] = useState<string | null>(null);
  const [formhomeworkid, setformhomeworkid] = useState<string | null>(null);
  const [formsubmissiondate, setformsubmissiondate] = useState<string | null>(
    null,
  );
  const [formCreatedBy, setformCreatedBy] = useState<string | null>(null);
  const [formClassName, setformClassName] = useState<string | null>(null);
  const [formSectionName, setformSectionName] = useState<string | null>(null);
  const [formSubjectName, setformSubjectName] = useState<string | null>(null);
  const [formDesc, setformDesc] = useState<string | null>(null);
  const [classes2, setClassessData2] = useState<Array<any>>([]);
  const [section2, setSections2] = useState<Array<any>>([]);
  const [subjectGroup2, setSubjectGroup2] = useState<Array<any>>([]);
  const [subject2, setSubject2] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
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

  const [keyword, setKeyword] = useState<string>("");
  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({ rating: "", desc: "" });
  const [editing, setEditing] = useState(false); // Add state for editing
  const [currentLeaveId, setCurrentLeaveId] = useState<number | null>(null); // ID of the leave being

  const [open, setOpen] = useState(false);
  const [evaluateOpen, setEvaluateOpen] = useState(false);

  const columns = [
    "Teacher Name",
    "Subject",
    "Time",
    "Room No",
    "Email",
    "Phone",
    "My Rating",
    "Rate",
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

  const roleName = useLoginDetails((state) => state.roleName);

  const userId = useLoginDetails((state) => state.userId);

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
      setformCreatedBy(currentData.created_by);
      setformClassName(currentData.class_name);
      setformSectionName(currentData.section_name);
      setformSubjectName(currentData.subject_name);
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
      `${student.staff.name} ${student.staff.surname}`,
      student.staff.name || "N/A",
      student.staff.name || "N/A",
      student.staff.name || "N/A",
      student.staff.email || "N/A",
      student.staff.contact_no || "N/A",

      [1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${Number(student.rate) >= star ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      )),

      <div key={student.id} className="flex items-center space-x-2">
        <IconButton
          onClick={() => handleEdit(student.id, student)}
          aria-label="edit"
        >
          <RateReview />
        </IconButton>
      </div>,
    ]);
  };

  const formatStudentDataInForm = (students: any[]) => {
    return students.map((student: any) => ({
      id: student.id,
      name: `${student.firstname || ""}  ${student.lastname || ""} (${student.id})`,
      selected: false,
    }));
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
      const result = await fetchTeacherReviewGetData(
        currentPage + 1,
        rowsPerPage,
        roleName,
        userId,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data.user_ratedstafflist);
      setData(formattedData);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      let result;
      const updateData = { rating: formData.rating, desc: formData.desc };
      if (editing) {
        result = await editTeacherReviewData(currentLeaveId, updateData);
        console.log("currentLeaveId", currentLeaveId);
        fetchData(page, rowsPerPage);
      }
      if (result.success) {
        toast.success(editing ? "Added successfully" : " successfully");
        setFormData({
          rating: "",
          desc: "",
        });

        setSelectedIds([]);

        setformhomeworkid(null);
        setformsubmissiondate(null);
        setformhomeworkdate(null);
        setformCreatedBy(null);
        setformClassName(null);
        setformSectionName(null);
        setformSubjectName(null);
        setformDesc(null);

        setformCreatedBy(null);

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
      setFormData({ rating: data.rate, desc: data.comment });

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

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(
      page,
      rowsPerPage,
      selectedClass,
      selectedSection,
      selectedSubjectGroup,
      selectedSubject,
      keyword,
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEvaluate = (data: any) => {
    setEvaluateOpen(true);
    setCurrentData(data);
    if (data.id) {
      fetchStudentOnly(data.id);
    }
  };

  const handleClose = () => {
    setFormData({
      rating: "",
      desc: "",
    });

    setSelectedClass2("");
    setSelectedSection2("");
    setSelectedSubjectGroup2("");
    setSelectedSubject2("");
    setOpen(false);
    setEvaluateOpen(false);
    setEvaluationDate("");
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
    setSelectedClass2("");
    setSelectedSection2("");
    setSelectedSubjectGroup2("");
    setSelectedSubjectGroup("");
    setSubject2([]);
    setSubject([]);
    setKeyword("");
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
  const fetchStudentOnly = async (data: any) => {
    try {
      // Fetch se ctions if a class is selected
      if (data) {
        const getresult = await fetchStudentHomeworkData(data);

        setStudents(formatStudentDataInForm(getresult.data));
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRatingChange = (star: any) => {
    setFormData((prev) => ({
      ...prev,
      rating: star, // update the rating in form data
    }));
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

  const [students, setStudents] = useState<
    { id: any; name: string; selected: boolean }[]
  >([]);
  const [evaluationDate, setEvaluationDate] = useState("");

  const [selectedIds, setSelectedIds] = useState<number[]>([]); // Store selected IDs in an array

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      // Check if the ID is already in the array
      if (prevSelectedIds.includes(id)) {
        // If it is, remove it (uncheck)
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // If not, add it (check)
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleSave2 = async () => {
    if (evaluationDate == "") {
      toast.error("Please select evaluation date");
      return;
    }
    const result = await createHomeWorkEvaluvation(
      JSON.stringify(selectedIds),
      formhomeworkid,
    );

    if (result.success) {
      toast.success("saved successfully");
      fetchData(page, rowsPerPage); // Refresh data after submit
      setSelectedClass2("");
      setSelectedSection2("");
      setSelectedSubjectGroup2("");

      setSelectedIds([]);

      setformhomeworkid(null);
      setformsubmissiondate(null);
      setformhomeworkdate(null);
      setformCreatedBy(null);
      setformClassName(null);
      setformSectionName(null);
      setformSubjectName(null);
      setformDesc(null);

      setformCreatedBy(null);

      setSelectedSubject2("");
      handleClose();
    } else {
      toast.error("Failed to save ");
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
              title={" Teachers Reviews"}
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
                {editing ? "Rate" : "Add Homework"}
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
            <div className="">
              <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
                {/* Star Rating */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Rating <span className="required">*</span>
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={`cursor-pointer text-2xl ${Number(formData.rating) >= star ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="field mb-3">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="desc"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.desc}
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
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
