"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchSubjectData,
  createSubject,
  deleteSubject,
  editSubject,
  
} from "@/services/subjectsService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    is_active: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [classes, setClasses] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchSubjectData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatSubjectData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, name: string, code: string, type: string, is_active: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({ name, code, type, is_active });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      code: "",
      type: "",
      is_active: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name,
      subject.description || "N/A",
      <div key={subject.id}>
        <IconButton onClick={() => handleEdit(subject.id, subject.name, subject.code, subject.type, subject.is_active)} aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(subject.id)} aria-label="delete">
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editSubject(
          editCategoryId,
          formData.name,
          formData.code,
          formData.type,
          formData.is_active,
         
        );
        if (result.success) {
          toast.success("Subject updated successfully");
        } else {
          toast.error("Failed to update subject");
        }
      } else {
        const result = await createSubject(
          formData.name,
          formData.code,
          formData.type,
          formData.is_active,
         
        );
        if (result.success) {
          toast.success("Subject group created successfully");
        } else {
          toast.error("Failed to create subject group");
        }
      }

      // Reset form after successful action
      setFormData({
        name: "",
        code: "",
        type: "",
        is_active: "",
        
      });

      setIsEditing(false);
      setEditCategoryId(null);
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

  const handleClassChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
    if (event.target.value) await fetchSections(event.target.value);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Name", "Class Section", "Subject", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    page,
    rowsPerPage,
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
                    Name
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
                    Class:
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
                    Section:
                  </label>
                  <select
                    value={selectedSection || ""}
                    onChange={handleSectionChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:border-strokedark dark:bg-boxdark dark:bg-form-input dark:text-white dark:drop-shadow-none dark:focus:border-primary"
                    disabled={!selectedClass} // Disable section dropdown if no class is selected
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
                    Subject<span className="required">*</span>
                  </label>
                  {["Maths", "English", "Hindi"].map((subject) => (
                    <label
                      key={subject}
                      className="radio-inline mb-2 block text-sm font-medium text-black dark:text-white"
                    >
                      <input
                        className="mr-2"
                        type="checkbox"
                        value={subject.toLowerCase()}
                        name="class_teacher"
                      />
                      {subject}
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
                    name="code"
                    value={formData.code}
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
          <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Subject Group List"}
              data={data}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeesMaster;
