"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";

import {
  createFeesMasterData,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { fetchSubjectData } from "@/services/subjectsService";
import { fetchSubjectGroupData } from "@/services/subjectGroupService";
import {
  createLesson,
  deleteLesson,
  editLesson,
  fetchLesson,
} from "@/services/lessonService";
import { set } from "date-fns";
const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<Array<any>>([]);
  const [subjectGroup, setSubjectGroup] = useState<Array<any>>([]);
  const [colorMode, setColorMode] = useColorMode();

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
  const [formData, setFormData] = useState({
    session_id: "",
    subject_group_subject_id: "",
    subject_group_class_sections_id: "",
    name: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchLesson(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);

      const classesResult = await getClasses();
      setClassessData(classesResult.data);
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }

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

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLesson(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const handleSubjectGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSubjectGroup(event.target.value);
  };

  const handleEdit = (id: any, data: any) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setSelectedClass(data.session_id);
    setSelectedSection(data.subject_group_subject_id);
    setSelectedSubjectGroup(data.subject_group_class_sections_id);
    setSelectedSubject(data.subject_group_class_sections_id);
    setFormData({
      session_id: "",
      subject_group_subject_id: "",
      subject_group_class_sections_id: "",
      name: "",
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.id,

      student.session_id || "N/A",
      student.subject_group_subject_id || "N/A",
      student.subject_group_class_sections_id || "N/A",
      student.name || "N/A",
      <div key={student.id} className="flex items-center space-x-2">
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

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [
    page,
    rowsPerPage,
    selectedClass,
    selectedSection,
    selectedSubjectGroup,
    selectedSubject,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editLesson(
          editCategoryId,

          formData,
        );
        if (result.success) {
          toast.success(" updated successfully");
        } else {
          toast.error("Failed to update ");
        }
      } else {
        const resultLesson = await createLesson(formData);
        if (resultLesson.success) {
          toast.success("saved successfully");
        } else {
          toast.error("Failed to save ");
        }
      }
      setSelectedClass("");
      setSelectedSection("");
      setSelectedSubjectGroup("");
      setSelectedSubject("");
      setFormData({
        session_id: "",
        subject_group_subject_id: "",
        subject_group_class_sections_id: "",
        name: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCategoryId(null);
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

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = [
    "Class",
    "Section",
    "Subject Group",
    "Subject",
    "Lesson",
    "Action",
  ];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    selectableRows: "none", // Disable row selection
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Add Lesson" : "Add Lesson"}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Class:
                </label>
                <select
                  value={selectedClass || ""}
                  onChange={handleClassChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:bg-form-input dark:text-white dark:drop-shadow-none dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Section:
                </label>
                <select
                  value={selectedSection || ""}
                  disabled={!selectedClass}
                  onChange={handleSectionChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:bg-form-input dark:text-white dark:drop-shadow-none dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {section.map((sec) => (
                    <option key={sec.section_id} value={sec.section_id}>
                      {sec.section_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Subject Group <span className="required">*</span>
                </label>
                <select
                  value={selectedSubjectGroup || ""}
                  onChange={handleSubjectGroupChange}
                  disabled={!selectedClass || !selectedSection}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:bg-form-input dark:text-white dark:drop-shadow-none dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {subjectGroup.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Subject
                </label>
                <select
                  value={selectedSubject || ""}
                  onChange={handleSubjectChange}
                disabled={
                    !selectedClass || !selectedSection || !selectedSubjectGroup
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:bg-form-input dark:text-white dark:drop-shadow-none dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {subject.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Lesson Name
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update" : "Save"}
                </button>

                {isEditing && (
                  <button
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Lesson List"}
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
