"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  createFeesMaster,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { fetchsectionData } from "@/services/sectionsService";
import { fetchclassesSectionData } from "@/services/classesSectionService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

interface Section {
  id: number;
  section: string;
}

interface FormData {
  fees_group: string;
  fees_type: string;
  due_date: string;
  amount: string;
  fine_type: string;
  percentage: string;
  description: string;
  fine_amount: string;
}

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sections, setSections] = useState<Section[]>([]);
  const [colorMode] = useColorMode();
  const [formData, setFormData] = useState<FormData>({
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
    setLoading(true);
    try {
      const result = await fetchclassesSectionData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    try {
      const sectionResult = await fetchsectionData(
        currentPage + 1,
        rowsPerPage,
      );
      setSections(sectionResult.data);
    } catch (error) {
      console.error("Failed to fetch sections", error);
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

  const handleEdit = (id: number, fees_group_value: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      ...formData,
      fees_group: fees_group_value,
    });
  };

  const formatStudentCategoryData = (students: any[]) =>
    students.map((student: any) => [
      student.class_name,
      student.section_name || "N/A",
      <div key={student.id}>
        <IconButton
          onClick={() => handleEdit(student.id, student.category)}
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
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Class", "Section", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    selectableRows: "none",
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
      {isEditing ? "Edit Class" : "Add Class"}
    </h3>
  </div>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <div className="flex flex-col gap-5.5 p-6.5">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Class<span className="text-red-500"> *</span>
        </label>
        <input
          type="text"
          name="class_id"
          onChange={handleInputChange}
          required
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Sections<span className="text-red-500"> *</span>
        </label>
        <div className="flex flex-col gap-2">
          {sections.length > 0 ? (
            sections.map((section) => (
              <label
                key={section.id}
                className="flex items-center text-sm font-medium text-black dark:text-white"
              >
                <input
                  type="radio"
                  value={section.id}
                  name="section_id"
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4"
                />
                {section.section}
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No sections available</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="rounded bg-primary px-5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </form>
</div>


        </div>

        <div className="flex flex-col gap-9">
          <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Class List"}
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
