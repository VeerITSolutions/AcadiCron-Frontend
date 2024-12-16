"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";

import {
  createFeesMaster,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";

import { fetchsectionData } from "@/services/sectionsService"; // Import your section API service
import { fetchClassAssingTeacherData } from "@/services/classesAssingTeacherService"; // Import your section API service
import { getClasses } from "@/services/classesService"; // Import your section API service
import {
  createStaff,
  deleteStaff,
  fetchStaffData,
  editStaffData,
  getStaffbyrole,
} from "@/services/staffService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [teacher, setTeacherData] = useState<Array<Array<any>>>([]);

  const [loading, setLoading] = useState(true);
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
  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({
    fees_group: "",
    fees_type: "",
    due_date: "",
    amount: "",
    fine_type: "",
    percentage: "",
    description: "",
    fine_amount: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchClassAssingTeacherData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await getStaffbyrole(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setTeacherData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await getClasses(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setClassessData(result.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchsectionData(currentPage + 1, rowsPerPage); // Fetch the section data from API
      setSections(result.data); // Assuming your API returns section data as an array
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch sections", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeesMasterData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (
    id: number,
    fees_group_value: string,
    fees_type_value: string,
    due_date_value: string,
    amount_value: string,
    fine_type_value: string,
    percentage_value: string,
    description_value: string,
    fine_amount_value: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      fees_group: fees_group_value,
      fees_type: fees_type_value,
      due_date: due_date_value,
      amount: amount_value,
      fine_type: fine_type_value,
      percentage: percentage_value,
      description: description_value,
      fine_amount: fine_amount_value,
    });
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.class,
      student.section || "N/A",
      student.name || "N/A",

      <div key={student.id} className="flex">
        <IconButton
          onClick={() =>
            handleEdit(
              student.id,
              student.class,
              student.section,
              student.due_date,
              student.amount,
              student.fine_type,
              student.percentage,
              student.description,
              student.fine_amount,
            )
          }
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
  }, [page, rowsPerPage]);

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
        const result = await editFeesMasterData(
          editCategoryId,

          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          formData.description,
          formData.fine_amount,
        );
        if (result.success) {
          toast.success("Student House updated successfully");
        } else {
          toast.error("Failed to update Student House");
        }
      } else {
        const result = await createFeesMaster(
          formData.fees_group,
          formData.fees_type,
          formData.due_date,
          formData.amount,
          formData.fine_type,
          formData.percentage,
          formData.description,
          formData.fine_amount,
        );
        if (result.success) {
          toast.success("Student House saved successfully");
        } else {
          toast.error("Failed to save Student House");
        }
      }

      setFormData({
        fees_group: "",
        fees_type: "",
        due_date: "",
        amount: "",
        fine_type: "",
        percentage: "",
        description: "",
        fine_amount: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Class", "Section", "Class Teacher", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    page: page,
    selectableRows: "none", // Disable row selection
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    setFormData({
      fees_group: "",
      fees_type: "",
      due_date: "",
      amount: "",
      fine_type: "",
      percentage: "",
      description: "",
      fine_amount: "",
    });
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? "Edit Assign Class Teacher"
                  : "Assign Class Teacher"}
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  Class Teacher <span className="required">*</span>
                </label>
                {teacher.map((teachers: any) => (
                  <label
                    key={teachers.id}
                    className="mb-2 block text-sm font-medium text-black dark:text-white"
                  >
                    <input
                      className="mr-3"
                      type="checkbox"
                      value={teachers.id}
                      name="class_teacher"
                    />
                    {`${teachers.name} ${teachers.surname} (${teachers.id})`}
                  </label>
                ))}
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
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Class Teacher List"}
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
