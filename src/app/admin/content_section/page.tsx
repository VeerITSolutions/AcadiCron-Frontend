"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import {
  fetchContentData,
  createContentData,
  deleteContentData,
  editContentForUpload,
} from "@/services/ContentService";
import { Edit, Delete, FileDownload } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./StudentDetails.module.css"; // Import CSS module
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

const StudentCategories = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();

  const [allsuperadmin, setAllsuperadmin] = useState(false);
  const [allstudents, setAllstudents] = useState(false);
  const [allclasses, setAllclasses] = useState(false);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [categorynew, setCategorynew] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [colorMode, setColorMode] = useColorMode();
  const [isSuperAdminChecked, setIsSuperAdminChecked] = useState(false);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    "0",
  );
  const [roleId, setRoleId] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    is_public: "",
    class_id: selectedClass,
    cls_sec_id: selectedSection,
    file: "",
    created_by: "",
    note: "",
    is_active: "",
    created_at: "",
    updated_at: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // State for modal visibility
  const [open, setOpen] = useState<boolean>(false);

  const handleSuperAdminChange = (e: any) => {
    setIsSuperAdminChecked(e.target.checked);
    if (e.target.checked) {
      // Reset class and section selection when disabling them
      setSelectedClass("");
      setSelectedSection("0");
    }
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchContentData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { target: { name: string; value: string } }, // Extend type to include Quill's custom events
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle file input changes
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

  const handleDelete = async (id: number) => {
    try {
      await deleteContentData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    title: string,
    type: string,
    date: string,
    class_id: string,
    cls_sec_id: string,
    role: string,
    note: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setCategorynew(title);
    setOpen(true); // Open the modal
  };

  const handleDownload = (url: string) => {
    try {
      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;

      // Set the 'download' attribute to trigger the file download
      // This forces the file to be downloaded rather than displayed in the browser
      link.setAttribute("download", "");

      // Append the link, trigger click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error initiating the download:", error);
    }
  };

  const formatStudentCategoryData = (students: any[]) => {
    if (!Array.isArray(students)) return []; // Fallback to an empty array if not an array

    return students.map((student: any) => [
      student.title || "N/A",
      student.type || "N/A",
      student.date || "N/A",
      student.class ? student.content_for_role : "All",
      `${student.class ?? ""} ${student.section ? `(${student.section})` : "-"}` ||
        "N/A",

      <div key={student.id} className="flex items-center space-x-2">
        <IconButton
          onClick={() =>
            handleDownload(process.env.NEXT_PUBLIC_BASE_URL + student.file)
          }
          aria-label="download"
        >
          {student.file ? <FileDownload /> : ""}
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

  const handleSuperAdminChangeforcheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllsuperadmin(e.target.checked);
  };

  const handleAllStudentChangeforcheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllstudents(e.target.checked);
  };

  const handleClassessChangeforcheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllclasses(e.target.checked);
  };

  useEffect(() => {
    const getroleId = localStorage.getItem("role_id");
    if (getroleId) {
      setRoleId(getroleId);
    }

    const roleName = localStorage.getItem("role_name");
    if (roleName) {
      setRoleName(roleName);
    }
    fetchData(page, rowsPerPage);
    setAllsuperadmin(false);
    setAllstudents(false);
    setAllclasses(false);
  }, [page, rowsPerPage]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        class_id: selectedClass,
        cls_sec_id: selectedSection,
        created_by: roleId,
        role: roleName,
        allsuperadmin: allsuperadmin,
        allstudents: allstudents,
        allclasses: allclasses,
      };

      const response = await createContentData(data);

      if (response.status == 200) {
        toast.success("Added successful");
        setFormData({
          title: "",
          type: "",
          is_public: "",
          class_id: selectedClass,
          cls_sec_id: selectedSection,
          file: "",
          created_by: "",
          note: "",
          is_active: "",
          created_at: "",
          updated_at: "",
          date: new Date().toISOString().slice(0, 10),
        });
        fetchData(page, rowsPerPage);

        setSelectedSection("0");
        setSelectedClass("");
        setAllsuperadmin(false);
        setAllstudents(false);
        setAllclasses(false);
      } else {
        toast.error("Error Edit data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
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
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
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
  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = [
    "Content Title",
    "Type",
    "Date",
    "Available For",
    "Class",
    "Action",
  ];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    selectableRows: "none", // Disable row selection
    count: totalCount,
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
                {isEditing ? "Edit Upload Content" : "Upload Content"}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Content Title <span className="required">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Content Type <span className="required">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="assignments">Assignments</option>
                  <option value="studymaterial">Study Material</option>
                  <option value="syllabus">Syllabus</option>
                  <option value="otherdownload">Other Download</option>
                </select>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Available For <span className="required">*</span>
                </label>
                <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    className=" User_radio__EmAK7"
                    type="checkbox"
                    value="add_super_admin"
                    name="add_super_admin"
                    onChange={handleSuperAdminChangeforcheckbox}
                  />{" "}
                  All Super Admin{" "}
                </label>
                <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    className=" User_radio__EmAK7"
                    type="checkbox"
                    value="add_all_student"
                    name="add_all_student"
                    onChange={handleAllStudentChangeforcheckbox}
                  />{" "}
                  All Student{" "}
                </label>
              </div>
              <div
                className={`mt-2 px-2 ${isSuperAdminChecked ? "bg-gray" : ""}`}
              >
                <div className="field">
                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      className="User_radio__EmAK7"
                      type="checkbox"
                      value="add_all_classes"
                      name="add_all_classes"
                      onChange={handleClassessChangeforcheckbox}
                    />{" "}
                    Available For All Classes{" "}
                  </label>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Class:
                  </label>
                  <select
                    value={selectedClass || ""}
                    onChange={handleClassChange}
                    className={`mb w-full rounded-lg border-[1.5px] border-stroke px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      isSuperAdminChecked
                        ? "bg-gray disabled:cursor-default"
                        : ""
                    }`}
                    disabled={isSuperAdminChecked}
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
                    className={`w-full rounded-lg border-[1.5px] border-stroke px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                      isSuperAdminChecked
                        ? "bg-gray disabled:cursor-default"
                        : ""
                    }`}
                    disabled={isSuperAdminChecked}
                  >
                    <option value="">Select</option>
                    {section.map((sec) => (
                      <option key={sec.section_id} value={sec.section_id}>
                        {sec.section_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Upload Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <input
                  name="note"
                  type="text"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Student Photo
                </label>
                <input
                  className="form-control User_f-13__35loD mt-2 w-full"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
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
                title={"Content List"}
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

export default StudentCategories;
