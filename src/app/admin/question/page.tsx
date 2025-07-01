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
import { Editor } from "@tinymce/tinymce-react";

import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService"; // Import your section API service
import {
  fetchQuestionData,
  createQuestionData,
  deleteQuestionData,
  editQuestionData,
} from "@/services/questionService";

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
import { Delete, Edit } from "@mui/icons-material";
import { getClasses, fetchclassesData } from "@/services/classesService";
import { fetchLeaveTypeData } from "@/services/leaveTypeService";
import { fetchStaffData } from "@/services/staffService";
import { useLoginDetails } from "@/store/logoStore";
import content from "mui-datatables";
import { env } from "process";

const columns = [
  "Q. ID",
  "Subject",
  "Question Type",
  "Level",
  "Question",
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

const QuestionBank = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [roledata, setRoleData] = useState<Array<Array<string>>>([]);
  const [savedSessionstate, setSavedSession] = useState("");
  const [staffData, setStaffData] = useState<Array<Array<string>>>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [selectedSubject1, setSelectedSubject1] = useState<string[]>([]);
  const [subjectData, setSubjectData] = useState<Array<any>>([]);
  const [subjectData1, setSubjectData1] = useState<Array<any>>([]);
  const [Classes, setClassessData] = useState<Array<any>>([]);
  const [Classes1, setClassessData1] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [section1, setSections1] = useState<Array<any>>([]);

  const [editing, setEditing] = useState(false); // Add state for editing

  const [roleleavedata, setRoleLeaveData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedClass1, setSelectedClass1] = useState<string | undefined>(
    undefined,
  );
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(
    undefined,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );

  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );

  const [selectedSection1, setSelectedSection1] = useState<string | undefined>(
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
    subject_id: "",
    class_id: "",
    section_id: "",
    Attach_file: "",
  });
  const [formData1, setFormData1] = useState({
    subject_id: "",
    question_type: "",
    level: "",
    class_id: "",
    section_id: "",
  });

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchQuestionData(currentPage + 1, rowsPerPage);
      const resultSubjectData = await fetchSubjectData("", "");
      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setSubjectData(resultSubjectData.data);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteQuestionData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
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

  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      subject_id: subject.subject_id,
      class_id: subject.class_id,
      section_id: subject.section_id,
      Attach_file: subject.Attach_file,
    });

    setFormData1({
      subject_id: subject.subject_id,
      question_type: subject.question_type,
      level: subject.level,
      class_id: subject.class_id,
      section_id: subject.section_id,
    });
  };

  const handleCancel = () => {
    setFormData({
      subject_id: "",
      class_id: "",
      section_id: "",
      Attach_file: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };
  const handleCancel1 = () => {
    setFormData1({
      subject_id: "",
      question_type: "",
      level: "",
      class_id: "",
      section_id: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.subject_id || "N/A",
      subject.class_id || "N/A",
      subject.section_id || "N/A",
      subject.Attach_file || "N/A",
      <div key={subject.id} className="flex">
        <IconButton
          onClick={() => handleEdit(subject.id, subject)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(subject.id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  const formatSubjectData1 = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.id || "N/A",
      subject.subject_name || "N/A",
      subject.question_type || "N/A",
      subject.level || "N/A",
      subject.question || "N/A",
      <div key={subject.id} className="flex">
        <IconButton
          onClick={() => handleEdit(subject.id, subject)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
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
  }, [
    page,
    rowsPerPage,
    selectedSubject,
    selectedClass,
    selectedSection,
    keyword,
  ]);
  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

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
  const handlePageChange2 = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };
  const handleClassChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass1(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setFormData({
      subject_id: "",
      class_id: "",
      section_id: "",
      Attach_file: "",
    });

    setSelectedRoleLeave("");
    setSelectedStaff("");
    setSelectedLeaveselectedLeaveType("");
    setOpen(false);
    setEditing(false); // Reset editing state
  };
  const handleClose1 = () => {
    setFormData1({
      subject_id: "",
      question_type: "",
      level: "",
      class_id: "",
      section_id: "",
    });

    setOpen1(false);
    setEditing(false); // Reset editing state
  };

  const handleEditorChange = (content: any, editor: any) => {
    try {
      console.log("Content:", content);
      // Perform additional logic
    } catch (error) {
      console.error("Error in handleEditorChange:", error);
    }
  };

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

  const fetchQuestions = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchQuestionData(currentPage + 1, rowsPerPage);
      const resultSubjectData = await fetchSubjectData("", "");
      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setSubjectData(resultSubjectData.data);

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
        result = await editQuestionData(
          selectedClass,
          selectedSection,
          selectedSubject,
          formData.subject_id,
          formData.class_id,
          formData.section_id,
          formData.Attach_file,
        );

        fetchData(page, rowsPerPage);
      } else {
        result = await createQuestionData(selectedClass);
        fetchData(page, rowsPerPage); // Refresh data after submit
      }
      if (result.success) {
        toast.success(
          editing
            ? "Question updated successfully"
            : "Question applied successfully",
        );
        setFormData({
          subject_id: "",
          class_id: "",
          section_id: "",
          Attach_file: "",
        });
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSubject([]);
        setOpen(false); // Close the modal
        setEditing(false); // Reset editing state
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        toast.error("Failed to save question");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred while saving Question");
    }
  };

  const handleSave2 = async () => {
    try {
      let result;
      if (editing) {
        result = await editQuestionData(
          selectedClass,
          selectedSection,
          selectedSubject,
          formData.subject_id,
          formData1.question_type,
          formData1.level,
          formData.class_id,
          formData.section_id,
        );

        fetchData(page, rowsPerPage);
      } else {
        result = await createQuestionData(selectedClass);
        fetchData(page, rowsPerPage); // Refresh data after submit
      }
      if (result.success) {
        toast.success(
          editing
            ? "Question updated successfully"
            : "Question applied successfully",
        );
        setFormData1({
          subject_id: "",
          question_type: "",
          level: "",
          class_id: "",
          section_id: "",
        });
        setSelectedClass("");
        setSelectedSection("");
        setSelectedSubject([]);
        setOpen(false); // Close the modal
        setEditing(false); // Reset editing state
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        toast.error("Failed to save question");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred while saving Question");
    }
  };

  // const handleSubmit1 = async () => {
  //   try {
  //     if (isEditing && editCategoryId !== null) {
  //       const result = await editQuestionData(editCategoryId, formData);
  //       if (result.success) {
  //         toast.success("Subject group updated successfully");
  //       } else {
  //         toast.error("Failed to update subject group");
  //       }
  //     } else {
  //       const result = await createQuestionData(formData);

  //       setFormData1({
  //         subject_id: "",
  //         question_type: "",
  //         level: "",
  //         class_id: "",
  //         section_id: "",
  //       });

  //       setSelectedClass("");
  //       setSelectedSection("");
  //       setSelectedSubject([]);

  //       if (result.success) {
  //         toast.success("Question created successfully");
  //       } else {
  //         toast.error("Failed to create Question");
  //       }
  //     }
  //     // Reset form after successful action
  //     setFormData1({
  //       subject_id: "",
  //       question_type: "",
  //       level: "",
  //       class_id: "",
  //       section_id: "",
  //     });

  //     setIsEditing(false);
  //     setEditCategoryId(null);
  //     fetchData(page, rowsPerPage); // Refresh data after submit
  //     setOpen(false);
  //     setOpen1(false);
  //   } catch (error) {
  //     console.error("An error occurred", error);
  //   }
  // };

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
          <button
            type="submit"
            className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
            onClick={handleClickOpen}
          >
            {"Import"}
          </button>
          <button
            type="submit"
            className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
            onClick={handleClickOpen1}
          >
            {editing ? "Edit Question" : "Add Question"}
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Questions"}
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
          className="dialog-min-width dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                Import{" "}
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Subject<span className="required">*</span>
                  </label>
                  <select
                    name="subject_id" // Adding name attribute for dynamic handling
                    value={formData.subject_id}
                    onChange={handleSelectChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {subjectData.map((sec: any) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Class <span className="required">*</span>
                  </label>
                  <select
                    name="class_id" // Adding name attribute for dynamic handling
                    value={selectedClass1}
                    onChange={handleClassChange1}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {Classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Section <span className="required">*</span>
                  </label>
                  <select
                    name="section_id" // Adding name attribute for dynamic handling
                    value={formData.section_id}
                    onChange={handleSelectChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {section.map((sec) => (
                      <option key={sec.section_id} value={sec.section_id}>
                        {sec.section_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attach File
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="image" // Optional: Include name for form data
                    onChange={handleFileChange} // Handle file change separately
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="col-span-full flex">
                  <button
                    onClick={handleSave}
                    className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
                  >
                    Save
                  </button>
                  <a
                    className="ml-4 inline-flex rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
                    href="https://erp.educron.com/admin/question/exportformat"
                    target="_blank"
                  >
                    Download Sample File
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={open1}
          onClose={handleClose1}
          className="dialog-min-width dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Add Question" : "Add Question"}
              </h3>
              <IconButton
                onClick={handleClose1}
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Subject <span className="required">*</span>
                  </label>
                  <select
                    name="subject_id" // Adding name attribute for dynamic handling
                    value={formData.subject_id}
                    onChange={handleSelectChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {subjectData.map((sec: any) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Question Type <span className="required">*</span>
                  </label>
                  <select
                    name="question_type" // Adding name attribute for dynamic handling
                    value={selectedType}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="">Single Choice</option>
                    <option value="">Multiple Choice</option>
                    <option value="">True/False</option>
                    <option value="">Descriptive</option>
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Question level <span className="required">*</span>
                  </label>
                  <select
                    name="Question_level" // Adding name attribute for dynamic handling
                    value={selectedLevel}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    <option value="">Low</option>
                    <option value="">Medium</option>
                    <option value="">High</option>
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Class <span className="required">*</span>
                  </label>
                  <select
                    name="class_id" // Adding name attribute for dynamic handling
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {Classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Section <span className="required">*</span>
                  </label>
                  <select
                    name="Section" // Adding name attribute for dynamic handling
                    value={selectedSection1 || ""}
                    onChange={handleSectionChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {section.map((sec) => (
                      <option key={sec.section_id} value={sec.section_id}>
                        {sec.section_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Question <span className="required">*</span>
                  </label>
                  <Editor
                    key={themType}
                    apiKey={process.env.NEXT_PUBLIC_API_TINYMCE} // Replace with your TinyMCE API key
                    initialValue=""
                    value={content}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help",
                      content_style:
                        themType === "dark"
                          ? "body { background-color: #24303F; color: #fff; font-family: Arial, sans-serif; }"
                          : "body { background-color: #fff; color: #000; font-family: Arial, sans-serif; }",
                      skin: themType === "dark" ? "oxide-dark" : "oxide", // Apply dark/light skin
                      content_css: themType === "dark" ? "oxide-dark" : "oxide", // Apply dark/light content styling
                    }}
                  />
                </div>

                <div className="col-span-full">
                  <button
                    onClick={handleSave2}
                    className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
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

export default QuestionBank;
