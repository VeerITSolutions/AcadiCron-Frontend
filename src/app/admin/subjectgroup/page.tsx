"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchSubjectGroupData,
  createSubjectGroup,
  deleteSubjectGroup,
  editSubjectGroup,
  createSubjectGroupAdd,
} from "@/services/subjectGroupService";

import { fetchSubjectData } from "@/services/subjectsService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [dataSubject, setDataSubject] = useState<Array<any>>([]);
  const [createdata, setcreatedata] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

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
    name: "",
    description: "",
    session_id: savedSessionstate,
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchSubjectGroupData(currentPage + 1, rowsPerPage);

      const resultSubjectData = await fetchSubjectData();

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setDataSubject(resultSubjectData.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubjectGroup(id);
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
    setSelectedClass("");
    setSelectedSection([]);
    setSelectedSubject([]);

    setFormData({
      name: subject.name,
      description: subject.description,
      session_id: savedSessionstate,
    });

    setSelectedSubject(subject.subjects.map((subject: any) => subject.id));
    setSelectedSection(
      subject.class_sections.map(
        (classSection: any) => classSection?.class_section?.section?.id,
      ),
    );

    setSelectedClass(
      subject.class_sections.map(
        (classSection: any) => classSection?.class_section?.class?.id,
      ),
    );
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      session_id: savedSessionstate,
    });
    setIsEditing(false);
    setEditCategoryId(null);
    setSelectedClass("");
    setSelectedSection([]);
    setSelectedSubject([]);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name,
      subject?.class_sections?.map((classSection: any, index: number) => (
        <div key={index}>
          {classSection?.class_section?.class?.class || "No Class"} -{" "}
          {classSection?.class_section?.section?.section || "No Section"}
        </div>
      )),

      subject.subjects.map((subject: any, index: number) => (
        <p key={index}>{subject.name}</p>
      )),
      <div key={subject.id}>
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
  }, [page, rowsPerPage]);

  useEffect(() => {
    const savedSession = localStorage.getItem("selectedSessionId");
    if (savedSession) {
      setSavedSession(savedSession);
      // Use this value in your logic
    }
  }, []);

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
        const result = await editSubjectGroup(
          editCategoryId,
          formData,
          selectedSubject,
          selectedSection,
          savedSessionstate,
        );
        if (result.success) {
          toast.success("Subject group updated successfully");
        } else {
          toast.error("Failed to update subject group");
        }
      } else {
        const result = await createSubjectGroupAdd(
          formData,
          selectedSubject,
          selectedSection,
          savedSessionstate,
        );

        setFormData({
          name: "",
          description: "",
          session_id: savedSessionstate,
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
        name: "",
        description: "",
        session_id: savedSessionstate,
      });

      setIsEditing(false);
      setEditCategoryId(null);
      setSelectedClass("");
      setSelectedSection([]);
      setSelectedSubject([]);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClassChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedClass(event.target.value);
    setPage(0);
    if (event.target.value) await fetchSections(event.target.value);
  };

  const handleSectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionId: string,
  ) => {
    if (event.target.checked) {
      setSelectedSection((prev) => [...prev, sectionId]);
    } else {
      setSelectedSection((prev) => prev.filter((id) => id !== sectionId));
    }
    setPage(0);
  };

  const handleSubjectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionId: string,
  ) => {
    if (event.target.checked) {
      setSelectedSubject((prev) => [...prev, sectionId]);
    } else {
      setSelectedSubject((prev) => prev.filter((id) => id !== sectionId));
    }
  };

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClasses(classesResult.data);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchSections = async (classId: string) => {
    try {
      const sectionsResult = await fetchsectionByClassData(classId);
      setSections(sectionsResult.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, []);

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = ["Name", "Class Section", "Subject", "Action"];
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

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Add Subject Group" : "Add Subject Group"}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Class: <span className="required">*</span>
                  </label>
                  <select
                    value={selectedClass || ""}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    Section: <span className="required">*</span>
                  </label>
                  <div
                    className={`flex flex-wrap gap-4 ${!selectedClass ? "pointer-events-none opacity-50" : ""}`}
                  >
                    {section.map((sec) => (
                      <label
                        key={sec.section_id}
                        className="flex items-center gap-2 text-black dark:text-white"
                      >
                        <input
                          type="checkbox"
                          value={sec.section_id}
                          checked={selectedSection.includes(sec.section_id)}
                          onChange={(e) =>
                            handleSectionChange(e, sec.section_id)
                          }
                          disabled={!selectedClass}
                          className="rounded border-stroke text-primary focus:ring-primary dark:border-form-strokedark dark:bg-boxdark dark:text-white"
                        />

                        {sec.section_name}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Subject<span className="required">*</span>
                  </label>
                  {dataSubject.map((subject) => (
                    <label
                      key={subject.id}
                      className="radio-inline mb-2 block text-sm font-medium text-black dark:text-white"
                    >
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={selectedSubject.includes(subject.id)}
                        value={subject.id}
                        name="subject_id"
                        onChange={(e) => handleSubjectChange(e, subject.id)}
                      />
                      {subject.name}
                    </label>
                  ))}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancel} // Call the cancel function
                      className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Subject Group List"}
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
